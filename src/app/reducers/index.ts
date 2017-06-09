type Action = {
  type: "setState";
  state: State;
} | {
  type: "newPage";
  name: "default";
  args: any;
} | {
  type: "404";
  url: string
} | {
  type: "@@redux/INIT";
};

interface State {
  clicks: number;
}

export interface Store {
  getState: () => State;
  dispatch: (action: Action) => void;
  subscribe: (subscription: () => void) => void;
}

function assertNever(action: never): void {
  console.error("Unhandled case", action);
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "404":
      return state;
    case "setState":
      return state;
    case "newPage":
      return state;
    case "@@redux/INIT":
      return state;
    default:
      assertNever(action);
      return state;
  }
}
