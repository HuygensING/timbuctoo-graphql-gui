import { action, storiesOf } from "@kadira/storybook";
import * as React from "react";
declare const module: any; // when webpack compiles it provides a module variable

storiesOf("Button", module)
  .add("with text", () => (
    <button>Hello Button</button>
  ))
  .add("with some emoji", () => (
    <button onClick={action("clicked")}>😀 😎 👍 💯</button>
  ));
