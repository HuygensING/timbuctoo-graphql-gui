import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import CollectionForm from "./collection-form";

const data = {
  columns: [
    {name: "Voornaam", isConfirmed: true},
    {name: "Achternaam"},
    {name: "Alternatief"},
    {name: "Sterfplaats"},
    {name: "ignored", isIgnored: true}
  ],
  archetypeFields: [
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
    },
  ],
  availableArchetypes: [
    "locations", "persons"
  ],
  availableCollectionColumnsPerArchetype: {
    locations: [
      {collectionName: "Lokaties", columns: ["naam", "land", "lat", "lon"]},
      {collectionName: "Alternatieve Lokaties", columns: ["naam", "land", "opmerkingen"]},
    ],
    persons: [
      {collectionName: "Migranten", columns: ["ID", "Voornaam", "tussenvoegsel", "Achternaam", "Geboren in"]},
    ]
  },
  propertyMappings: [
    {
      property: "givenName",
      variable: [{variableName: "Voornaam"}],
      confirmed: true
    }, {
      property: "surname",
      variable: [{variableName: "Achternaam"}],
      confirmed: false
    }, {
      property: "custom",
      variable: [{variableName: "Alternatief"}],
    }, {
      property: "hasDeathPlace",
      variable: [{variableName: "Sterfplaats", targetCollection: "Alternatieve Lokaties", targetVariableName: "naam"}],
    }, {
      property: "hasBirthPlace",
      variable: [{variableName: "Achternaam"}],
    }
  ],
  customPropertyMappings: [
    {
      name: "custom",
      type: "text",
    },
    {
      name: "hasDeathPlace",
      type: "relation",
    },
    {
      name: "hasSibling",
      type: "relation"
    }
  ],
  collectionName: "Migranten"
};

const actions = {
  onConfirmFieldMappings: action("confirming field mappings"),
  onRemoveCustomProperty: action("removing custom property"),
  onSetFieldMapping: action("setting field mapping"),
  onUnconfirmFieldMappings: action("unconfirming field mappings"),
  onAddCustomProperty: action("adding custom property"),
  onClearFieldMapping: action("clearing field mapping")
};


storiesOf('CollectionForm', module)
  .add('all supported types of mappings/state in a row', () => (
    <CollectionForm {...data} {...actions} />
  ));

