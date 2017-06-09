import * as Route from "route-parser";

interface RouterArgs<Routes, State> {
  routes: Routes; // fixme: unittest that validates the order of Object.keys
  onNavigateNew: (routeName: keyof Routes, urlargs: {}) => void;
  onNavigateAgain: (routeName: keyof Routes, state: State) => void;
  onNoMatchFound: (url: string) => void;
}

export class Router<T, Routes extends { [key in keyof T]: string }, State> {
  private routes: Array<{ name: keyof Routes; route: Route }>;
  private currentUrl?: string;
  private storedState: {
    [url: string]: { name: keyof Routes; state?: State };
  } = {};

  // the last arg is for type inference
  constructor(
    private config: RouterArgs<Routes, State>,
    initialUrl: string,
    state: State,
  ) {
    this.routes = [];
    for (const name in config.routes) {
      if (config.routes.hasOwnProperty(name)) {
        this.routes.push({ name, route: new Route(config.routes[name]) });
      }
    }
    this.onUrl(initialUrl);
  }

  public onUrl(url: string) {
    if (url in this.storedState && this.storedState[url].state !== undefined) {
      const storedState = this.storedState[url];
      // make typescript happy
      if (storedState.state === undefined) {
        throw new Error("This cannot happen. We check for it two lines above.");
      }
      this.config.onNavigateAgain(storedState.name, storedState.state);
      this.currentUrl = url;
    } else {
      let matchedRoute: {
        name: keyof Routes;
        routeMatch: { [i: string]: string };
      } | null = null;
      for (const routeHandler of this.routes) {
        const routeMatch = routeHandler.route.match(url);
        if (typeof routeMatch !== "boolean") {
          matchedRoute = { name: routeHandler.name, routeMatch };
          break;
        }
      }
      if (matchedRoute !== null) {
        this.config.onNavigateNew(matchedRoute.name, matchedRoute.routeMatch);
        this.storedState[url] = { name: matchedRoute.name, state: undefined };
        this.currentUrl = url;
      } else {
        this.config.onNoMatchFound(url);
        this.currentUrl = undefined;
      }
    }
  }

  public saveState(state: State) {
    if (this.currentUrl !== undefined) {
      this.storedState[this.currentUrl].state = state;
    } else {
      console.error("Not saving state because we're not at a route");
    }
  }
}
