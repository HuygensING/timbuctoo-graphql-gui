import * as React from "react";
import {Actions} from "../actions";
import { State } from "../reducers";
import FirstUpload from "./firstUpload";
import Page from "./page";

export function Gui(props: {state: State, actions: Actions}) {
  const state = props.state;
  const actions = props.actions;
  return (
    <Page>
      <FirstUpload
        loginAction={actions.performLogin}
        isLoggedIn={false}
        gotoUpload={actions.gotoUpload}
      />
    </Page>
  );
}
