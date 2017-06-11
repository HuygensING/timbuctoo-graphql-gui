import { action, storiesOf } from "@kadira/storybook";
import * as React from "react";
import FirstUpload from "./firstUpload";
declare const module: any; // when webpack compiles it provides a module variable

// tslint:disable-next-line:no-empty
function empty() {}

export default function({ storiesOf, action, linkTo, knobs }: any) {
  storiesOf("first upload jumbotron", module)
    .add("not logged in", () =>
      <FirstUpload gotoUpload={action("gotoUpload")} isLoggedIn={false} loginAction={action("login")} />,
    )
    .add("logged in", () =>
      <FirstUpload gotoUpload={action("gotoUpload")} isLoggedIn={true} loginAction={action("login")} />,
    );
}
