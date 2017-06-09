import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Detail from "./detail";

const person = {
    _id: "asd",
    givenName: "Sara",
    familyName: "Lomannus",
    birthDate: "1810",
    deathDate: "1880",
    gender: "FEMALE",
    "@displayName": "Sara Lomannus",
    "@relations": {
      hasBirthPlace: [
        {displayName: "Amsterdam"}
      ],
      hasDeathPlace: [
        {displayName: "Den Haag"}
      ]
    },
    "^modified": {
      "timeStamp": 1412771409015,
      "userId": "USER000000000005",
      "vreId": "WomenWriters",
      "username": "Janouk de Groot"
    },
    "^created": {
      "timeStamp": 1411642983780,
      "userId": "importer",
      "vreId": "neww"
    }
};

const collectionMetadata = {
  collectionName: "persons",
  collectionLabel: "persons",
  archetypeName: "person",
  properties: [
    {name: "givenName", type: "text"},
    {name: "familyName", type: "text"},
    {name: "gender", type: "select"},
    {name: "birthDate", type: "datable"},
    {name: "deathDate", type: "datable"},
    {name: "hasBirthPlace", type: "relation"},
    {name: "hasDeathPlace", type: "relation"}
  ]
};

storiesOf('FacetedSearch/Detail', module)
  .add('the fiche...', () => (
    <Detail entity={{...person}} collectionMetadata={{...collectionMetadata}}  />
  ));
