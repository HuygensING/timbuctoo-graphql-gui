import * as React from "react";
import { Actions } from "../actions";
import { State } from "../reducers";
import { assertNever } from "../support/assertNever";
import FirstUpload from "./firstUpload";
import { Map } from "./map";
import Page from "./page";

export function Gui(props: { state: State; actions: Actions }) {
  const state = props.state;
  const actions = props.actions;
  let pageType;
  switch (state.currentPage) {
    case "default":
      pageType = (
        <FirstUpload
          loginAction={actions.performLogin}
          isLoggedIn={false}
          gotoUpload={() =>
            actions.gotoUpload("dierikx_ontwikkelingssamenwerking")}
        />
      );
      break;
    case "mapping":
      pageType = <Map actions={actions} state={state.pageSpecific.mapping} />;
      break;
    default:
      assertNever(state.currentPage);
  }
  return (
    <Page>
      {pageType}
    </Page>
  );
}
