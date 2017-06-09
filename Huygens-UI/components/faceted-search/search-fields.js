import React from "react";
import TextSearch from "./search-fields/text-search";
import ListFacet from "./search-fields/list-facet";
import RangeFacet from "./search-fields/range-facet";
const components = {
  text: TextSearch,
  "list-facet": ListFacet,
  "range-facet": RangeFacet
};

class SearchFields extends React.Component {

  render() {
    const { onSetCollapse, onFacetSortChange, onSearchFieldChange} = this.props;
    const { fields, results, query, truncateFacetListsAt } = this.props;

    return (
      <div className="facet-group">
        {fields.map((searchField, i) => {
          const { type, field } = searchField;
          const SearchComponent = components[type];
          const facets = type === "list-facet" || type === "range-facet" ? results.facets[field] || [] : null;
          return (<SearchComponent key={`${i}_${field}`} facets={facets} onChange={onSearchFieldChange}
                                   collapse={searchField.collapse}
                                   onFacetSortChange={onFacetSortChange} onSetCollapse={onSetCollapse}
                                   query={query} truncateFacetListsAt={truncateFacetListsAt}
                                   field={searchField.field} label={searchField.label} value={searchField.value} />)
        })}
      </div>
    )
  }
}

export default SearchFields;