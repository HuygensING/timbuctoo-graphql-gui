import * as React from "react"
declare const module: any

export default function ({
    storiesOf,
    action,
    linkTo,
    knobs,
  }: any) {
  storiesOf("Button", module)
    .add("with text", () => (
      <button className="foo">{knobs.text("Name", "Arunoda Susiripala")}</button>
    ))
    .add("with textas", () => (
      <button>asdaHello Button</button>
    ));
}
