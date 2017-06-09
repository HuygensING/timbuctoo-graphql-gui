import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import FacetedSearch from './faceted-search';
import TextSearch from "./search-fields/text-search";
import Pagination from "./results/pagination";
import SortMenu from "./sort-menu";
import ListFacet from "./search-fields/list-facet";

const collections = {
  collections: [
    {
      name: "asd_persons",
      label: "Persons",
      selected: true,
      query: {
        searchFields: [
          {label: "Type a name", field: "name_t", type: "text" },
          {label: "Gender", field: "gender_s", type: "list-facet" },
          {label: "Date of birth", field: "birthDate_i", type: "range-facet" },
          {label: "Long field", field: "long_field_s", type: "list-facet"}
        ],
        sortFields: [
          {label: "Name", field: "name_t"},
          {label: "Gender", field: "gender_s"},
          {label: "Date of birth", field: "birthDate_i"},
        ],
        start: 0,
        rows: 10
      },
      results: {
        docs: [
          {"displayName_s": "Margaret Fuller ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Sara Lomannus ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Margaret Fuller ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Sara Lomannus ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Margaret Fuller ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Sara Lomannus ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Margaret Fuller ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Sara Lomannus ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Margaret Fuller ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Sara Lomannus ", "birthDate_i": 1805, "deathDate_i": 1850},
        ],
        numFound: 1320,
        facets: {
          gender_s: [
            "FEMALE", 1320 - 123 - 50,
            "MALE", 123,
            "UNKNOWN", 50
          ],
          birthDate_i: [
            "1805", 10,
            "1806", 10,
            "1807", 10,
            "1808", 10,
            "1809", 10,
            "1815", 10,
            "1816", 10,
            "1817", 10,
            "1818", 10,
            "1819", 10,
            "1820", 10,
            "1822", 10,
            "1850", 10,
            "1851", 10,
          ],
          long_field_s: [
            "valuea", 20,
            "valueb", 20,
            "valuec", 20,
            "valued", 20,
            "valuee", 20,
            "valuef", 20,
            "valueg", 20,
            "valueh", 20,
            "valuei", 20,
            "valuej", 20,
            "valuek", 20,
            "valuel", 20,
            "valuem", 20,
            "baluea", 20,
            "balueb", 20,
            "baluec", 20,
            "balued", 20,
            "baluee", 20,
            "baluef", 20,
            "balueg", 20,
            "balueh", 20,
            "baluei", 20,
            "baluej", 20,
            "baluek", 20,
            "baluel", 20,
            "baluem", 20,
          ]
        }
      }
    },
    {name: "asd_documents", label: "Documents"},
    {name: "asd_collectives", label: "Collectives"}
  ]
};

const collectionsWithValues = {
  collections: [
    {
      name: "asd_persons",
      label: "Persons",
      selected: true,
      query: {
        searchFields: [
          {label: "Type a name", field: "name_t", type: "text", value: "Robert"},
          {label: "Gender", field: "gender_s", type: "list-facet", value: ["MALE", "UNKNOWN"]},
          {label: "Date of birth", field: "birthDate_i", type: "range-facet", value: [1810, 1820] },
          {label: "Long field", field: "long_field_s", type: "list-facet", collapse: true}
        ],
        sortFields: [
          {label: "Name", field: "name_t", value: "asc"},
          {label: "Gender", field: "gender_s"},
          {label: "Date of birth", field: "birthDate_i"}
        ],
        start: 20,
        rows: 10
      },
      results: {
        docs: [
          {"displayName_s": "Sara Lomannus ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Margaret Fuller ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Sara Lomannus ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Margaret Fuller ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Sara Lomannus ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Margaret Fuller ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Sara Lomannus ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Margaret Fuller ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Sara Lomannus ", "birthDate_i": 1805, "deathDate_i": 1850},
          {"displayName_s": "Margaret Fuller ", "birthDate_i": 1805, "deathDate_i": 1850},
        ],
        numFound: 1320,
        facets: {
          gender_s: [
            "FEMALE", 1320 - 123 - 50,
            "MALE", 123,
            "UNKNOWN", 50
          ],
          birthDate_i: [
            "1805", 10,
            "1806", 10,
            "1807", 10,
            "1808", 10,
            "1809", 10,
            "1815", 10,
            "1816", 10,
            "1817", 10,
            "1818", 10,
            "1819", 10,
            "1820", 10,
            "1822", 10,
            "1850", 10,
            "1851", 10,
          ],
          long_field_s: [
            "valuea", 20,
            "valueb", 20,
            "valuec", 20,
            "valued", 20,
            "valuee", 20,
            "valuef", 20,
            "valueg", 20,
            "valueh", 20,
            "valuei", 20,
            "valuej", 20,
            "valuek", 20,
            "valuel", 20,
            "valuem", 20,
            "baluea", 20,
            "balueb", 20,
            "baluec", 20,
            "balued", 20,
            "baluee", 20,
            "baluef", 20,
            "balueg", 20,
            "balueh", 20,
            "baluei", 20,
            "baluej", 20,
            "baluek", 20,
            "baluel", 20,
            "baluem", 20,
          ]
        }
      }
    },
    {name: "asd_documents", label: "Documents"},
    {name: "asd_collectives", label: "Collectives"}
  ]
};



const actions = {
  onSearchFieldChange: action("setting search field value"),
  onCollectionSelect: action("selecting collection"),
  onClearSearch: action("clearing search"),
  onPageChange: action("changing page"),
  onSortFieldChange: action("changing sort field"),
  onFacetSortChange: action("changing facet sort"),
  onSetCollapse: action("setting collapse")
};

storiesOf('FacetedSearch', module)
  .add('the search...', () => (
    <FacetedSearch {...collections} {...actions} truncateFacetListsAt={5}  />
  ))
  .add('...with values', () => (
    <FacetedSearch {...collectionsWithValues} {...actions} truncateFacetListsAt={5} />
  ))
  .add('SortMenu', () => (
    <SortMenu sortFields={[
      {label: "Name", field: "koppelnaam_s"},
      {label: "Date of birth", field: "birthDate_i"},
      {label: "Date of death", field: "deathDate_i", value: "desc"}]}
              onChange={actions.onSortFieldChange}
    />
  ))
  .add('ListFacet', () => (
    <ListFacet field="long_field_s" facets={collections.collections[0].results.facets["long_field_s"]}
               query={collections.collections[0].query} label="Long field" truncateFacetListsAt={5}
               {...actions} onChange={actions.onSearchFieldChange}
    />
  ))
  .add('Pagination', () => (
    <Pagination onChange={actions.onPageChange} numFound={100} start={0} rows={10} />
  ))
  .add('TextSearch', () => (
    <TextSearch field="name" label="Type a name" onChange={action("setting value")} />
  ));
