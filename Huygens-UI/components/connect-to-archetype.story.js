import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import ConnectToArchetype from "./connect-to-archetype";

const initialData = {
  sheets: [
    {collection: 'migranten'},
    {collection: 'locaties'}
  ],
  uploadedFileName: "data.xls",
  archetype: {
    persons: {},
    locations: {}
  },
  mappings: {
    collections: {
      migranten: {
        archetypeName: null
      },
      locaties: {
        archetypeName: null
      }
    }
  }
};

const oneConnected = {
  ...initialData,
  mappings: {
    ...initialData.mappings,
    collections: {
      ...initialData.mappings.collections,
      migranten: {
        archetypeName: 'persons'
      }
    }
  }
};

const twoConnected = {
  ...oneConnected,
  mappings: {
    ...oneConnected.mappings,
    collections: {
      ...oneConnected.mappings.collections,
      locaties: {
        archetypeName: 'locations'
      }
    }
  }
};


storiesOf('Connect to archetype', module)
  .add('initially', () => (
    <ConnectToArchetype {...initialData} onMapCollectionArchetype={action('Connects ["collection", "archetype"]')} />
  ))
  .add('one connected', () => (
    <ConnectToArchetype {...oneConnected} onMapCollectionArchetype={action('Connects ["collection", "archetype"]')} />
  ))
  .add('two connected', () => (
    <ConnectToArchetype {...twoConnected} onConfirmCollectionArchetypeMappings={action('Confirms mappings')} />
  ));


