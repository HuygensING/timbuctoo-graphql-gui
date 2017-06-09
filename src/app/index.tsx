import * as React from "react";
import * as ReactDom from "react-dom";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Router} from "../_external/router";
import {Gui} from "./components";
import {reducer, Store} from "./reducers";

if (location.hash === "") {
  location.hash = "/";
}

const store: Store = createStore(reducer, {clicks: 2});
const router = new Router(
  {
    onNavigateAgain: (name, state) => store.dispatch({type: "setState", state}),
    onNavigateNew: (name, args) => store.dispatch({type: "newPage", name, args}),
    onNoMatchFound: (url) => store.dispatch({type: "404", url}),
    routes: {
      default: "/",
    },
  },
  location.hash.substr(1),
  store.getState(),
);
addEventListener("hashchange", (e) => router.onUrl(location.hash.substr(1)), true);

store.subscribe(function (){
  const curState = store.getState();
  router.saveState(curState);
  ReactDom.render(<Gui state={curState}></Gui>, document.getElementById("main"));
});

ReactDom.render(<Gui state={store.getState()}></Gui>, document.getElementById("main"));
