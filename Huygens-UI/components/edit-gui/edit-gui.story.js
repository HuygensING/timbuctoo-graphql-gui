import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import EditGui from "./edit-gui";
import Paginate from "./entity-index/paginate";

const data = {
  quickSearch: {
    start: 50,
    list: [
      {_id: "id1", "@displayName": "Sara Lomannus"},
      {_id: "id2", "@displayName": "Margareth Fuller"}
    ],
    rows: 50,
    query: ""
  },
  entity: {
    data: {
      "@relations": {}
    },
    domain: "persons",
    errorMessage: null
  },
  messages: {
    log: [
      {type: "ERROR_MESSAGE", message: "Something went wrong on the server"},
      {type: "SUCCESS_MESSAGE", message: "Something went ok on the server"},
      {type: "OTHER_TYPE", message: "invisible"}
    ]
  },
  vre: {
    collections: {
      locations: {
        collectionName: "locations",
        collectionLabel: "Locations",
        unknown: false,
        relationCollection: false
      },
      persons: {
        collectionName: "persons",
        collectionLabel: "Persons",
        unknown: false,
        relationCollection: false,
        properties: [{
          "name": "names",
          "type": "names",
          "options": ["FORENAME", "SURNAME", "NAME_LINK", "ROLE_NAME", "GEN_NAME"]
        },
        {
            "name": "types",
            "type": "multiselect",
            "options": [
                "ARCHETYPE",
                "AUTHOR",
                "PSEUDONYM",
                "READER"
            ]
        },
        {
            "name": "gender",
            "type": "select",
            "options": [
                "UNKNOWN",
                "MALE",
                "FEMALE",
                "NOT_APPLICABLE"
            ]
        },
        {
            "name": "birthDate",
            "type": "datable"
        },
        {
            "name": "deathDate",
            "type": "datable"
        },
        {
          "name": "links",
          "type": "links"
        },
        {
          "name": "listOfStuff",
          "type": "list-of-strings"
        },
        {
          "name": "isRelatedTo",
          "type": "relation",
          "relation": {
            "quickSearch": "stub",
          }
        }]
      },
      relations: {
        collectionName: "relations",
        collectionLabel: "rels",
        unknown: false,
        relationCollection: true
      },
      unknowns: {
        collectionName: "unknowns",
        collectionLabel: "unknowns",
        unknown: true,
        relationCollection: false
      }
    }
  }
};

const dataInEditMode = {
  ...data,
  entity: {
    ...data.entity,
    data: {
      _id: "some id",
      birthDate: "1928",
      deathDate: "1950",
      gender: "FEMALE",
      types: ["AUTHOR", "PSEUDONYM"],
      "names":[{"components":[{"type":"FORENAME","value":"Sara"},{"type":"SURNAME","value":"Lomannus"}]},{"components":[{"type":"FORENAME","value":"Sara"},{"type":"SURNAME","value":"Lomanus"}]}],
      links: [{
        "label": "To example domain",
        "url": "http://example.com"
      }],
      listOfStuff: ["something", "something else"],
      "@relations": {
        "isRelatedTo": [
          {displayName: "related thing", id: "asd", accepted: true},
          {displayName: "another related thing", id: "asds", accepted: true}
        ]
      }
    }
  },
  messages: { log: [] }
};

const mockAutoComplete = (p, f, cb) => cb([
  {key: "a", value: "abc"},
  {key: "b", value: "def"},
  {key: "c", value: "ghi"},
  {key: "d", value: "jkl"},
  {key: "ac", value: "abc"},
  {key: "bc", value: "def"},
  {key: "cc", value: "ghi"},
  {key: "dc", value: "jkl"},
  {key: "aa", value: "abc"},
  {key: "ba", value: "def"},
  {key: "ca", value: "ghi"},
  {key: "da", value: "jkl"}
].filter((v) => v.value.indexOf(f) > -1));

const actions = {
    onPaginateLeft: action("paginating left"),
    onPaginateRight: action("paginating right"),
    onSave: action("saving current entity"),
    onSelect: action("selecting entity"),
    onNew: action("making new entity"),
    onSelectDomain: action("selecting domain"),
    onQuickSearchQueryChange: action("setting quick search query"),
    onQuickSearch: action("starting quick search"),
    onDismissMessage: action("dismissing message"),
    onDelete: action("deleting current entity"),
    onChange: action("changing field")
};

storiesOf('EditGui', module)
  .add('paginate entries start', () => (
    <Paginate {...actions} start={0} listLength={50} rows={50} />
  ))
  .add('paginate entries middle', () => (
    <Paginate {...actions} start={50} listLength={50} rows={50} />
  ))
  .add('paginate entries end', () => (
    <Paginate {...actions} start={100} listLength={25} rows={50} />
  ))
  .add('the gui in new mode...', () => (
    <EditGui  {...actions} {...data}  getAutocompleteValues={mockAutoComplete} />
  ))
  .add('... in edit mode', () => (
    <EditGui  {...actions} {...dataInEditMode} getAutocompleteValues={mockAutoComplete} />
  ));
