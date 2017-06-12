import { action, storiesOf } from "@kadira/storybook";
import * as React from "react";
import FirstUpload from "./firstUpload";
declare const module: any; // when webpack compiles it provides a module variable

// tslint:disable-next-line:no-empty
function empty() {}

export default function({ storiesOf, action, linkTo, knobs }: any) {
  storiesOf("first upload jumbotron", module)
    .add("not logged in", () =>
      <FirstUpload gotoUpload={action("gotoUpload")} isLoggedIn={false} loginAction={action("login")} dataSets={{}} />,
    )
    .add("logged in", () =>
      <FirstUpload gotoUpload={action("gotoUpload")} isLoggedIn={true} loginAction={action("login")} dataSets={{}} />,
    )
    .add("with dataSets", () =>
      <FirstUpload
        userId="DUMMY"
        gotoUpload={action("gotoUpload")}
        isLoggedIn={true}
        loginAction={action("login")}
        dataSets={{
          DUMMY: {
            test: "https://data.anansi.clariah.nl/v5/33707283d426f900d4d55b410a78996dc730b2f7/test/graphql",
          },
          other_user: {
            awesome: "https://data.anansi.clariah.nl/v5/33707283d426f900d4d55b410a78996dc730b2f7/test/graphql",
          },
        }}
      />,
    );
}
