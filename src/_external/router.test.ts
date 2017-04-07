import deepEquals = require("deep-equal");
import {Router} from "./router";

const spies: {[key: string]: any[]} = {};

function makeSpy(name: string) {
  spies[name] = [];
  return function () {
    spies[name].push([].slice.apply(arguments));
  };
}

function resetSpies() {
  Object.keys(spies).forEach((key) => {
    spies[key] = [];
  });
}

function assertThat(test: () => boolean, message?: string) {
  if (!test()) {
    if (message !== undefined) {
      throw new Error(message);
    } else {
      throw new Error(test.toString());
    }
  }
}

export default function (describe: any, it: any) {
  describe("Router", function () {
    it("calls onNavigateNew when initialized", function () {
      const router = new Router({
        onNavigateAgain: makeSpy("onNavigateAgain"),
        onNavigateNew: makeSpy("onNavigateNew"),
        onNoMatchFound: makeSpy("onNoMatchFound"),
        routes: {
          catchAll: "/*a",
        },
      }, "/foo", {});
      assertThat(() => spies.onNavigateAgain.length === 0, "onNavigateAgain should not be called by a new router");
      assertThat(
        () => spies.onNoMatchFound.length === 0,
        "onNoMatchFound should not be called by a new router if the route matches",
      );
      assertThat(
        () => spies.onNavigateNew.length === 1,
        "onNavigateNew should be called once by a new router if the route matches",
      );
    });
    it("calls onNoMatchFound when initialized without a valid url", function () {
      const router = new Router({
        onNavigateAgain: makeSpy("onNavigateAgain"),
        onNavigateNew: makeSpy("onNavigateNew"),
        onNoMatchFound: makeSpy("onNoMatchFound"),
        routes: {
          route: "/test",
        },
      }, "/somethingElse", {});
      assertThat(() => spies.onNavigateAgain.length === 0, "onNavigateAgain should not be called by a new router");
      assertThat(
        () => spies.onNoMatchFound.length === 1,
        "onNoMatchFound should be called once by a new router if the route matches",
      );
      assertThat(
        () => spies.onNavigateNew.length === 0,
        "onNavigateNew should not be called by a new router if the route matches",
      );
    });
    it("calls onNavigateAgain when we revisit a route for which state has been saved", function () {
      const router = new Router({
        onNavigateAgain: makeSpy("onNavigateAgain"),
        onNavigateNew: makeSpy("onNavigateNew"),
        onNoMatchFound: makeSpy("onNoMatchFound"),
        routes: {
          route1: "/test",
          route2: "/test2",
        },
      }, "/test", {});
      router.saveState({bla: 1});
      router.onUrl("/test2");
      resetSpies();
      router.onUrl("/test");
      assertThat(
        () => spies.onNavigateAgain.length === 1,
        "onNavigateAgain should be called when navigating back to an existing route",
      );
      assertThat(
        () => deepEquals(spies.onNavigateAgain[0], ["route1", {bla: 1}], {strict: true}),
        "onNavigateAgain should be called with the the correct state",
      );
      assertThat(
        () => spies.onNoMatchFound.length === 0,
        "onNoMatchFound should note be called by the router if the route matches",
      );
      assertThat(
        () => spies.onNavigateNew.length === 0,
        "onNavigateNew should not be called by the router if the route has been visited before",
      );
    });
    it("calls onNavigateNew when we revisit a route for which NO state has been saved", function () {
      const router = new Router({
        onNavigateAgain: makeSpy("onNavigateAgain"),
        onNavigateNew: makeSpy("onNavigateNew"),
        onNoMatchFound: makeSpy("onNoMatchFound"),
        routes: {
          route1: "/test",
          route2: "/test2",
        },
      }, "/test", {});
      // router.saveState({bla: 1});
      router.onUrl("/test2");
      resetSpies();
      router.onUrl("/test");
      assertThat(
        () => spies.onNavigateAgain.length === 0,
        "onNavigateAgain should NOT be called when navigating back to an existing route for which no state has " +
        "been saved",
      );
      assertThat(
        () => spies.onNoMatchFound.length === 0,
        "onNoMatchFound should note be called by the router if the route matches",
      );
      assertThat(
        () => spies.onNavigateNew.length === 1,
        "onNavigateNew SHOULD be called if the route has been visited before, but no state has been saved",
      );
    });
    it("passes the route arguments to onNavigateNew", function () {
      const router = new Router({
        onNavigateAgain: makeSpy("onNavigateAgain"),
        onNavigateNew: makeSpy("onNavigateNew"),
        onNoMatchFound: makeSpy("onNoMatchFound"),
        routes: {
          route1: "/edit/:collection/:id",
        },
      }, "/edit/myCollection/2", {});
      assertThat(
        () => deepEquals(spies.onNavigateNew[0], ["route1", {collection: "myCollection", id: "2"}]),
        "onNavigateNew should be called with the router arguments",
      );
    });
    it("calls the router with the first route that matches", function () {
      const router = new Router({
        onNavigateAgain: makeSpy("onNavigateAgain"),
        onNavigateNew: makeSpy("onNavigateNew"),
        onNoMatchFound: makeSpy("onNoMatchFound"),
        routes: {
          route1: "/edit/:collection/:id",
          route2: "/edit/:collection/:id/extra",
          alsoMatches: "/edit/:collection/:id/extra",
        },
      }, "/edit/myCollection/2/extra", {});
      assertThat(
        () => spies.onNavigateNew[0][0] === "route2",
        "the first route that matches should be used",
      );
    });
  });
  describe("Object.keys", function () {
    it("lists keys in iteration order", function () {
      // as per js spec text keys should be listed in iteration order and numbers in ascending order
      assertThat(() => deepEquals(Object.keys({z: 26, a: 1, 0: 0}), ["0", "z", "a"]));
    });
  });
}
