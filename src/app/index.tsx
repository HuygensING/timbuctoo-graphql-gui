import { compact } from "jsonld";
import * as React from "react";
import * as ReactDom from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Router } from "../_external/router";
import { actionsFactory } from "./actions";
import { dierikx } from "./actions/rmlToViewState.test";
import { Gui } from "./components";
import config from "./config";
import { getRawCollections } from "./datafetchers/rawCollections";
import { defaultState, reducer, Store } from "./reducers";

function getQueryVariable(variable: string, location: Location) {
  const query = location.search.substring(1);
  const vars = query.split("&");
  for (const param of vars) {
    const pair = param.split("=");
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

const store: Store = createStore(
  reducer,
  defaultState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
const router = new Router(
  {
    onNavigateAgain: (name, state) => {
      store.dispatch({ type: "setState", state });
    },
    onNavigateNew: async function(name, args) {
      store.dispatch({ type: "newPage", name, args });
      if (name === "mapping") {
        const rawdataSets = await getRawCollections(store.getState().global.userId || "", args.dataSetId);
        store.dispatch({ type: "setRawDataSets", rawDataSets: rawdataSets });
      }
    },
    onNoMatchFound: url => store.dispatch({ type: "404", url }),
    routes: {
      default: "/",
      mapping: "/mapping/:dataSetId",
      create: "/create",
    },
  },
  location.hash.substr(1),
  store.getState(),
);
const actions = actionsFactory(store);
addEventListener(
  "hashchange",
  e => {
    router.onUrl(location.hash.substr(1));
  },
  true,
);

store.subscribe(function() {
  const curState = store.getState();
  router.saveState(curState);
  ReactDom.render(<Gui state={curState} actions={actions} />, document.getElementById("main"));
});

ReactDom.render(<Gui state={store.getState()} actions={actions} />, document.getElementById("main"));

const hsid = getQueryVariable("hsid", window.location);
if (hsid) {
  fetch(config.apiUrl + "/v2.1/system/users/me", {
    headers: {
      Authorization: hsid,
    },
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(userData: any) {
      store.dispatch({
        type: "setLoginToken",
        hsid,
        persistentId: userData.persistentId,
        displayName: userData.displayName,
      });
    });
}

actions.loadDataSets();
