import * as React from "react";
import { Actions } from "../actions";
import config from "../config";
import { State } from "../reducers";
import { assertNever } from "../support/assertNever";
import { Create } from "./create";
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
          isLoggedIn={state.global.userId != undefined}
          gotoUpload={() => actions.gotoCreate()}
          dataSets={state.global.dataSets}
          userId={state.global.userId}
        />
      );
      break;
    case "mapping":
      pageType = <Map actions={actions} state={state.pageSpecific.mapping} />;
      break;
    case "create":
      pageType = (
        <Create
          state={{
            ...state.pageSpecific.create,
            userId: state.global.userId || "(none)",
            baseUri: config.apiUrl,
            dataSetId: state.pageSpecific.create ? state.pageSpecific.create.dataSetId : undefined,
            title: state.pageSpecific.create ? state.pageSpecific.create.title : undefined,
          }}
          actions={actions.create}
        />
      );
      break;
    default:
      assertNever(state.currentPage);
  }
  return (
    <Page username={state.global.displayName}>
      {pageType}
    </Page>
  );
}
