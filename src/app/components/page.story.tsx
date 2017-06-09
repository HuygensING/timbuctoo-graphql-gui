import { action, storiesOf } from "@kadira/storybook";
import * as React from "react";
import Page from "./page";
declare const module: any; // when webpack compiles it provides a module variable

export default function ({
    storiesOf,
    action,
    linkTo,
    knobs,
  }: any) {
  storiesOf("Page", module)
    .add("without a user", () => (
      <Page>
      </Page>
    ))
    .add("with a user", () => (
      <Page username="Bas Doppen" userlocation="http://www.example.org">
      </Page>
    ))
    .add("with content (tests scrolling)", () => (
      <Page>
        <img src="http://placekitten.com/g/1280/1024"/>
      </Page>
    ));
}
