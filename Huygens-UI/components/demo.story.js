import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import App from './app.jsx';
import transformConnectDataProps from "./react-redux-connect/connect-data";


function override(orig, patch) {
  if (orig && typeof orig == "object") {
    if (patch && typeof patch == "object") {
      var copy = {};
      for (var key in patch) {
        copy[key] = override(orig[key], patch[key]);
      }
      return Object.assign({}, orig, copy);
    }
  }
  return patch;
}

function uploadStepsData(patch) {
  const baseData = {
    userdata: {
      userId: null,
      myVres: {},
      vres: {
        'WomenWriters': {name: 'Women Writers'},
        'CKCC': {name: 'CKCC'}
      }
    },
    importData: {
      isUploading: false
    },
    location: {
      pathname: "/"
    },
  };
  if (patch) {
    return override(baseData, patch)
  } else {
    return baseData;
  }
}

function connectArchetypeStepData(patch) {
  const baseData = {...uploadStepsData({
    userdata: {
      userId: "asd",

    },
    importData: {
      isUploading: false,
      sheets: [
        {collection: 'migranten'},
        {collection: 'locaties'}
      ],
      uploadedFileName: "data.xls",
    },
    location: {
      pathname: "/maparchetypes"
    },
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
    },
    showFileIsUploadedMessage: true
  })
  };
  if (patch) {
    return override(baseData, patch)
  } else {
    return baseData;
  }
}

function connectDataStepData(patch) {
  const baseData = connectArchetypeStepData();

  baseData.showCollectionsAreConnectedMessage = true;

  baseData.location = {
    pathname: "/mapdata"
  };

  baseData.importData = {
    activeCollection: 'migranten',
    isUploading: false,
    publishErrors: false,
    sheets: [
      {
        collection: 'migranten',
        variables: ["ID", "Voornaam", "tussenvoegsel", "Achternaam", "Geboren in"],
        rows: [
          [
            {value: "1"},
            {value: "Hans"},
            {value: ""},
            {value: "Achterberg"},
            {value: "Den Hoorn", error: "niet correct"}
          ]
        ],
        nextUrl: "//migranten.next"
      },
      {
        collection: 'locaties',
        variables: ["naam", "land", "opmerkingen"],
        rows: [
          [
            {value: "Den Hoorn"},
            {value: "Nederland"},
            {value: "correct"}
          ]
        ],
        nextUrl: "//locaties.next"
      }
    ],
    uploadedFileName: "data.xls",
  };
  baseData.mappings = {
    collections: {
      migranten: {
        archetypeName: 'persons',
        mappings: [{confirmed: false}, {confirmed: false}],
        ignoredColumns: [],
        customProperties: []
      },
      locaties: {
        archetypeName: 'locations',
        mappings: [{confirmed: false}, {confirmed: false}],
        ignoredColumns: [],
        customProperties: []
      }
    }
  };
  baseData.archetype = {
    persons: [
      {name: "givenName", type: "text"},
      {name: "surname", type: "text"},
      {name: "birthDate", type: "datable"}
    ],
    locations: [
      {name: "name", type: "text"},
      {name: "country", type: "text"},
    ]
  };

  if (patch) {
    return override(baseData, patch)
  } else {
    return baseData;
  }
}

function demo(name) {
  return linkTo("demo walkthrough", name);
}

const connectDataActions = {
  onConfirmFieldMappings: action("confirming field mappings"),
  onRemoveCustomProperty: action("removing custom property"),
  onSetFieldMapping: action("setting field mapping"),
  onUnconfirmFieldMappings: action("unconfirming field mappings"),
  onIgnoreColumnToggle: action("toggling ignore on column"),
  onSelectCollection: action("selecting collection"),
  onAddCustomProperty: action("adding custom property"),
  onClearFieldMapping: action("clearing field mapping"),
  onUploadFileSelect: action("reuploading file"),
  onLoadMoreClick: action("loads more data"),
  onPublishData: action("publishes data")

};

storiesOf('demo walkthrough', module)
  .add('Log in', () => (
      <App onLogin={demo("Initial upload")} {...uploadStepsData()} />
  ))
  .add('Initial upload', () => (
    <App onDataSetUpload={demo("uploading")} {...uploadStepsData({
      userdata: {
        userId: "asd"
      }
    })} />
  ))
  .add('uploading', () => (
    <App {...uploadStepsData({
      userdata: {
        userId: "asd",

      },
      importData: {
        isUploading: true
      }
    })} />
  ))
  .add('connect archetype 1', () => (
    <App {...connectArchetypeStepData()} onMapCollectionArchetype={demo('connect archetype 2')}
      onCloseMessage={action("closing message")} />
  ))
  .add('connect archetype 2', () => (
    <App {...connectArchetypeStepData({
      mappings: {
        collections: {
          migranten: { archetypeName: 'persons' }
        }
      },
      showFileIsUploadedMessage: false
    })} onMapCollectionArchetype={demo('connect archetype 3')}
         onCloseMessage={action("closing message")}/>
  ))
  .add('connect archetype 3', () => (
    <App {...connectArchetypeStepData({
      mappings: {
        collections: {
          migranten: { archetypeName: 'persons' },
          locaties:  { archetypeName: 'locations' }
        }
      },
      showFileIsUploadedMessage: false
    })} onMapCollectionArchetype={demo('connect archetype 2')}
        onConfirmCollectionArchetypeMappings={demo('connect data 1')}
        onCloseMessage={action("closing message")}
    />
  ))
  .add('connect data 1', () => (
    <App {...connectDataStepData()} {...transformConnectDataProps(connectDataStepData())} {...connectDataActions}
         onCloseMessage={action("closing message")}/>
  ))
  .add('connect data with errors 1', () => (
    <App {...connectDataStepData({importData: {publishErrors: true}, showCollectionsAreConnectedMessage: false})}
         {...transformConnectDataProps(connectDataStepData())}
         {...connectDataActions}
         onCloseMessage={action("closing message")} />
  ))
  .add('overview', () => (
    <App onDataSetUpload={demo("uploading overview")} {...uploadStepsData({
      userdata: {
        userId: "asd",
        myVres: {VreA: {name: "My first VRE" }}
      }
    })} />
  ))
  .add('uploading overview', () => (
    <App {...uploadStepsData({
      userdata: {
        userId: "asd",
        myVres: {VreA: {name: "My first VRE" }}
      },
      importData: {
        isUploading: true
      }
    })} />
  ));