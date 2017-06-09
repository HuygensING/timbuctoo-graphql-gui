import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import ConnectData from "./connect-data";
import transformProps from "./react-redux-connect/connect-data";

const initialData = {
  importData: {
    activeCollection: 'migranten',
    sheets: [
      {
        collection: 'migranten',
        variables: ["ID", "Voornaam", "tussenvoegsel", "Achternaam", "Geboren in", "familie ID"],
        rows: [
          [
            {value: "1"},
            {value: "Hans"},
            {value: ""},
            {value: "Achterberg"},
            {value: "Den Hoorn", error: "niet correct"},
            {value: "2"}
          ]
        ],
        nextUrl: "//migranten.next"
      },
      {
        collection: 'locaties',
        variables: ["naam", "land", "opmerkingen", "persId"],
        rows: [
          [
            {value: "Den Hoorn"},
            {value: "Nederland"},
            {value: "correct"},
            {value: "1"}
          ]
        ],
        nextUrl: "//locaties.next"
      }
    ]
  },
  uploadedFileName: "data.xlsx",
  archetype: {
    persons: [
      {name: "givenName", type: "text"},
      {name: "surname", type: "text"},
      {name: "birthDate", type: "datable"},
      {
        name: "hasDeathPlace",
        type: "relation",
        relation: {
          targetCollection: "locations",
        }
      }, {
        name: "hasBirthPlace",
        type: "relation",
        relation: {
          targetCollection: "locations",
        }
      }, {
        name: "hasSibling",
        type: "relation",
        relation: {
          targetCollection: "persons",
        }
      }, {
        name: "hasFoo",
        type: "relation",
        relation: {
          targetCollection: "fooz",
        }
      }
    ],
    locations: [
      {name: "name", type: "text"},
      {name: "country", type: "text"},
      {
        name: "isDeathPlaceOf",
        type: "relation",
        relation: {
          targetCollection: "persons",
        }
      }, {
        name: "isBirthPlaceOf",
        type: "relation",
        relation: {
          targetCollection: "persons",
        }
      }, {
        name: "hasFoo",
        type: "relation",
        relation: {
          targetCollection: "fooz",
        }
      }
    ]
  },
  mappings: {
    collections: {
      migranten: {
        archetypeName: 'persons',
        mappings: [{
          property: "hasSibling",
          variable: [{variableName: "familie ID", targetCollection: "migranten"}]
        }],
        ignoredColumns: [],
        customProperties: [{
          name: "hasSibling",
          type: "relation"
        }],
      },
      locaties: {
        archetypeName: 'locations',
        mappings: [{
          property: "name",
          variable: [{variableName: "naam"}],
          confirmed: true
        }, {
          property: "country",
          variable: [{variableName: "land"}],
          confirmed: false
        }, {
          property: "remarks",
          confirmed: false,
          variable: [{variableName: "opmerkingen"}]
        }],
        customProperties: [{
          name: "remarks",
          type: "text"
        }, {
          name: "isBirthPlaceOf",
          type: "relation"
        }],
        ignoredColumns: []
      }
    }
  }
};

const ignoreLocations = {
  ...initialData,
  mappings: {
    ...initialData.mappings,
    collections: {
      ...initialData.mappings.collections,
      locaties: {
        ...initialData.mappings.collections.locaties,
        ignoredColumns: ["naam", "land", "opmerkingen", "persId"],
        mappings: []
      }
    }
  }
};

const locationsActive = {
  ...initialData,
  importData: {
    ...initialData.importData,
    activeCollection: 'locaties',
  }
};

const allMappingsComplete = {
  ...initialData,
  mappings: {
    collections: {
      migranten: {
        archetypeName: 'persons',
        mappings: [{
          property: "givenName",
          variable: [{variableName: "Voornaam"}],
          confirmed: true
        }, {
          property: "surname",
          variable: [{variableName: "Achternaam"}],
          confirmed: true
        }, {
          property: "hasSibling",
          variable: [{variableName: "familie ID", targetCollection: "migranten", targetVariableName: "ID"}],
          confirmed: true
        }, {
          property: "hasBirthPlace",
          variable: [{variableName: "Geboren in", targetCollection: "locaties", targetVariableName: "naam"}],
          confirmed: true
        }],
        ignoredColumns: ["tussenvoegsel", "ID"],
        customProperties: [{
          name: "hasSibling",
          type: "relation"
        }, {
          name: "hasBirthPlace",
          type: "relation"
        }],
      },
      locaties: {
        archetypeName: 'locations',
        mappings: [{
          property: "name",
          variable: [{variableName: "naam"}],
          confirmed: true
        }, {
          property: "country",
          variable: [{variableName: "land"}],
          confirmed: true
        }, {
          property: "remarks",
          confirmed: true,
          variable: [{variableName: "opmerkingen"}]
        }, {
          property: "isBirthPlaceOf",
          confirmed: true,
          variable: [{variableName: "persId", targetCollection: "migranten", targetVariableName: "ID"}]
        }],
        customProperties: [{
          name: "remarks",
          type: "text"
        }, {
          name: "isBirthPlaceOf",
          type: "relation"
        }],
        ignoredColumns: []
      }
    }
  }
}


const actions = {
  onConfirmFieldMappings: action("confirming field mappings"),
  onRemoveCustomProperty: action("removing custom property"),
  onSetFieldMapping: action("setting field mapping"),
  onUnconfirmFieldMappings: action("unconfirming field mappings"),
  onIgnoreColumnToggle: action("toggling ignore on column"),
  onSelectCollection: action("selecting collection"),
  onAddCustomProperty: action("adding custom property"),
  onClearFieldMapping: action("clearing field mapping"),
  onLoadMoreClick: action("loads more data"),
  onPublishData: action("publishes data")
};


storiesOf('Connect data', module)
  .add('initially', () => (
    <ConnectData {...transformProps(initialData)} {...actions} />
  ))
  .add('ignore all location columns', () => (
    <ConnectData {...transformProps(ignoreLocations)} {...actions} />
  ))
  .add('locations is active', () => (
    <ConnectData {...transformProps(locationsActive)} {...actions} />
  ))
  .add('all mappings are complete', () => (
    <ConnectData {...transformProps(allMappingsComplete)} {...actions} />
  ));
