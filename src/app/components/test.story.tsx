import * as React from "react"
declare const module: any

export default function ({storiesOf}: any) {
  storiesOf("Button", module)
    .add("with text", () => (
      <button>Hello Button</button>
    ))
    .add("with textas", () => (
      <button>asdaHello Button</button>
    ));
}
