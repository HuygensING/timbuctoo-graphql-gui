import { action, storiesOf } from "@kadira/storybook";
import * as lorem from "lorem-ipsum";
import * as React from "react";
import Page from "./page";
import { defaultValues, Upload } from "./upload";
declare const module: any; // when webpack compiles it provides a module variable

export default function({ storiesOf, action, linkTo, knobs }: any) {
  const actions = {
    showModal: action("showModal"),
    cancelModal: action("cancelModal"),
    startUpload: action("startUpload"),
    next: action("next"),
    getResourceSyncData: action("getResourceSyncData"),
    downloadRsFile: action("getResourceSyncData"),
  };
  storiesOf("Upload", module)
    .add("No data entered", () =>
      <Page>
        <Upload
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
          }}
          actions={actions}
        />
      </Page>,
    )
    .add("with all fields filled", () =>
      <Page>
        <Upload
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
            files: ["my sheet.xlsx", "Some data.csv"],
            description: lorem({ count: 10, units: "sentences" }),
            provenance: lorem({ count: 10, units: "sentences" }),
            color: "#9ce479",
          }}
          actions={actions}
        />
      </Page>,
    )
    .add("picking an excel file", () =>
      <Page>
        <Upload
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
            fileIsBeingAdded: "xlsx",
          }}
          actions={actions}
        />
      </Page>,
    )
    .add("picking a csv file", () =>
      <Page>
        <Upload
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
            fileIsBeingAdded: "csv",
          }}
          actions={actions}
        />
      </Page>,
    )
    .add("picking an MS access file", () =>
      <Page>
        <Upload
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
            fileIsBeingAdded: "mdb",
            files: ["some previous file.csv"],
          }}
          actions={actions}
        />
      </Page>,
    )
    .add("entering a remote uri", () =>
      <Page>
        <Upload
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
            fileIsBeingAdded: "rs",
          }}
          actions={actions}
        />
      </Page>,
    )
    .add("entering a remote uri", () =>
      <Page>
        <Upload
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
            fileIsBeingAdded: "rs",
            remoteUri: "http://example.org",
          }}
          actions={actions}
        />
      </Page>,
    )
    .add("picking a remote file", () =>
      <Page>
        <Upload
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
            fileIsBeingAdded: "rs",
            remoteSets: ["http://example.org/set/1", "http://example.org/set/2"],
            remoteUri: "http://example.org",
          }}
          actions={actions}
        />
      </Page>,
    )
    .add("picking an DataPerfect file", () =>
      <Page>
        <Upload
          state={{
            ...defaultValues,
            title: "Sheep across the ages",
            fileIsBeingAdded: "dataperfect",
          }}
          actions={actions}
        />
      </Page>,
    );
}
