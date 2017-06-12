import { action, storiesOf } from "@kadira/storybook";
import * as lorem from "lorem-ipsum";
import * as React from "react";
import { Create, defaultValues } from "./create";
import Page from "./page";
declare const module: any; // when webpack compiles it provides a module variable

export default function({ storiesOf, action, linkTo, knobs }: any) {
  storiesOf("Create", module)
    .add("Not yet created", () =>
      <Page>
        <Create
          state={{
            ...defaultValues,
          }}
          actions={{
            onTitleChange: action("onTitleChange"),
            onCreateClick: action("onCreateClick"),
          }}
        />
      </Page>,
    )
    .add("Title entered, but is already in use by another dataset", () =>
      <Page>
        <Create
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
            dataSetId: "sheep-across-the-ages",
            titleIsDuplicate: true,
          }}
          actions={{
            onTitleChange: action("onTitleChange"),
            onCreateClick: action("onCreateClick"),
          }}
        />
      </Page>,
    )
    .add("Valid title entered", () =>
      <Page>
        <Create
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
            dataSetId: "sheep-across-the-ages",
            titleIsDuplicate: false,
          }}
          actions={{
            onTitleChange: action("onTitleChange"),
            onCreateClick: action("onCreateClick"),
          }}
        />
      </Page>,
    )
    .add("dataSetId differs from title", () =>
      <Page>
        <Create
          state={{
            ...defaultValues,
            title: 'Sheep across "the ages"',
            dataSetId: "sheep-across-the-ages",
            titleIsDuplicate: false,
          }}
          actions={{
            onTitleChange: action("onTitleChange"),
            onCreateClick: action("onCreateClick"),
          }}
        />
      </Page>,
    );
}
