import * as React from "react";
import { Actions } from "../actions";
import config from "../config";
import { State } from "../reducers";
import { assertNever } from "../support/assertNever";
import { Create } from "./create";
import FirstUpload from "./firstUpload";
import { Map } from "./map";
import Page from "./page";
import { Upload } from "./upload";

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
    case "upload":
      if (!state.global.userId) {
        window.location.hash = "/"; // redirect to home page
        throw new Error("Not logged in!");
      } else {
        pageType = (
          <Upload
            state={{
              ...state.pageSpecific.upload,
              availableColors: ["#ce7060", "#92e3fc", "#fade8d", "#9ce479", "#e39061", "#d3b2d6", "#95cac4"],
            }}
            actions={{ ...actions.upload, next: () => actions.gotoMapping(state.global.dataSetId || "") }}
          />
        );
      }
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
