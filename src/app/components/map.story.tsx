import { action, storiesOf } from "@kadira/storybook";
import * as lorem from "lorem-ipsum";
import * as React from "react";
import { fakeActionsFactory } from "../actions";
import { Map } from "./map";
import Page from "./page";
declare const module: any; // when webpack compiles it provides a module variable

const storyDefaults = {
  currentTab: undefined,
  mappings: {},
  rawDataCollections: {
    "http://example.com/myCollections/authors": {
      label: "authors",
      properties: [{ name: "Names", inUse: true }, { name: "birth place", inUse: false }],
    },
    "http://example.com/myCollections/books": {
      label: "books",
      properties: [{ name: "title", inUse: false }, { name: "publisher", inUse: false }],
    },
  },
};

export default function({ storiesOf, action, linkTo, knobs }: any) {
  const actions = fakeActionsFactory(action);
  storiesOf("Map", module)
    .add("No data entered", () =>
      <Page>
        <Map
          actions={actions}
          state={{
            ...storyDefaults,
          }}
        />
      </Page>,
    )
    .add("two mappings", () =>
      <Page>
        <Map
          actions={actions}
          state={{
            ...storyDefaults,
            mappings: {
              "http://collection": {
                mainCollection: {},
                predicateMaps: [],
                collectionType: "http://example.org/persons",
              },
              "http://collection2": {
                mainCollection: {},
                predicateMaps: [],
                collectionType: "http://example.org/books",
              },
            },
          }}
        />
      </Page>,
    )
    .add("selected mapping", () =>
      <Page>
        <Map
          actions={actions}
          state={{
            ...storyDefaults,
            currentTab: "http://collection2",
            mappings: {
              "http://collection": {
                mainCollection: {},
                predicateMaps: [],
                collectionType: "http://example.org/books",
              },
              "http://collection2": {
                mainCollection: {
                  sourceCollection: "http://example.com/myCollections/authors",
                  subjectTemplate: "http://example.com/{foo}",
                },
                predicateMaps: [],
                collectionType: "http://example.org/persons",
              },
            },
          }}
        />
      </Page>,
    )
    .add("Map as person", () =>
      <Page>
        <Map
          actions={actions}
          state={{
            ...storyDefaults,
            currentTab: "http://collection2",
            mappings: {
              "http://collection": {
                mainCollection: {},
                predicateMaps: [],
                collectionType: "http://example.org/persons",
              },
              "http://collection2": {
                mainCollection: {
                  sourceCollection: "http://example.com/myCollections/authors",
                  subjectTemplate: "http://example.com/{foo}",
                },
                collectionType: "http://example.org/persons",
                predicateMaps: [
                  {
                    key: "1",
                    predicate: "http://timbuctoo.com/name",
                    type: "property",
                    dataType: "string",
                    propertyName: "Names",
                  },
                  {
                    key: "2",
                    predicate: "http://timbuctoo.com/name",
                    type: "expression",
                    dataType: "string",
                    expression: "v[1] + v[2]",
                  },
                  {
                    key: "3",
                    predicate: "http://timbuctoo.com/custom",
                    type: "expression",
                    dataType: "number",
                    expression: "v[1] + v[2]",
                  },
                  {
                    key: "4",
                    predicate: "http://timbuctoo.com/custom",
                    type: "template",
                    dataType: "string",
                    template: "",
                  },
                  {
                    key: "5",
                    predicate: "http://timbuctoo.com/name",
                    type: "template",
                    dataType: "string",
                    template: "some{foo}bar",
                  },
                ],
                type: "Person",
              },
            },
          }}
        />
      </Page>,
    );
}
