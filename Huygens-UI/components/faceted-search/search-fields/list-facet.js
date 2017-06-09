import React from "react";
import cx from "classnames";

class ListFacet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: "",
      truncateFacetListsAt: props.truncateFacetListsAt
    };
  }

  handleClick(value) {
    const foundIdx = this.props.value.indexOf(value);
    if (foundIdx < 0) {
      this.props.onChange(this.props.field, this.props.value.concat(value));
    } else {
      this.props.onChange(this.props.field, this.props.value.filter((v, i) => i !== foundIdx));
    }
  }

  toggleExpand() {
    this.props.onSetCollapse(this.props.field, !(this.props.collapse || false));
  }

  render() {
    const { query, label, facets, field, value, facetSort, collapse } = this.props;
    const { truncateFacetListsAt } = this.state;

    const facetCounts = facets.filter((facet, i) => i % 2 === 1);
    const facetValues = facets.filter((facet, i) => i % 2 === 0);

    const facetSortValue = facetSort ? facetSort :
      query.facetSort ? query.facetSort :
        (query.facetLimit && query.facetLimit > -1 ? "count" : "index");

    const expanded = !(collapse || false);



    const showMoreLink = truncateFacetListsAt > -1 && truncateFacetListsAt < facetValues.length ?
      <a onClick={() => this.setState({truncateFacetListsAt: -1})}>
        Show all {facetValues.length} items
      </a> : null;

    return (
      <div className="facet basic-facet">
         <span onClick={this.toggleExpand.bind(this)} style={{cursor: "pointer"}}
               className={cx("glyphicon", "pull-right", "facet-extra", "hi-light-grey", {"glyphicon-collapse-up" : !collapse, "glyphicon-collapse-down": collapse})} />
         <h2 onClick={this.toggleExpand.bind(this)} style={{cursor: "pointer"}}>{label}</h2>
        { expanded ? (
          <div>
            <div className="facet-items-box">
              {facetValues.filter((facetValue, i) => truncateFacetListsAt < 0 || i < truncateFacetListsAt).map((facetValue, i) =>
                this.state.filter.length === 0 || facetValue.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1 ? (
                  <div className="facet-item downcase-then-capitalize" key={`${facetValue}_${facetCounts[i]}`} onClick={() => this.handleClick(facetValue)}>
                    {facetValue}
                    <span className="facet-item-amount">{facetCounts[i]}</span>
                    <svg className={cx("facet-check-box", {checked: value.indexOf(facetValue) > -1})} viewBox="0 0 15 15">
                      <circle cx="7.5" cy="7.5" r="7"/>
                    </svg>
                  </div>) : null
              )}
              {showMoreLink}
            </div>
            { facetValues.length > 4 ? (
              <div className="facet-extra-space">
                <div className="facet-extra">
                  <span  style={{cursor: "pointer"}} onClick={() => this.props.onChange(field, [])}
                         className="glyphicon glyphicon-remove-sign pull-right hi-light-grey" />

                  <input className="input-xs" onChange={(ev) => this.setState({filter: ev.target.value})} placeholder={`Filter in ${label}`} type="text" value={this.state.filter} />

                  <span className="btn-group">
                    <button className={cx("btn", "btn-default", "btn-xs", {"active": facetSortValue === "index"})}
                            onClick={() => this.props.onFacetSortChange(field, "index")}>a-z</button>
                    <button className={cx("btn", "btn-default", "btn-xs", {"active": facetSortValue === "count"})}
                            onClick={() => this.props.onFacetSortChange(field, "count")}>0-9</button>
                  </span>



                </div>
              </div>
            ) : null }
          </div>
        ) : null }
      </div>
    );
  }
}

ListFacet.defaultProps = {
  value: [],
  truncateFacetListsAt: -1
};

ListFacet.propTypes = {
  bootstrapCss: React.PropTypes.bool,
  children: React.PropTypes.array,
  collapse: React.PropTypes.bool,
  facetSort: React.PropTypes.string,
  facets: React.PropTypes.array.isRequired,
  field: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFacetSortChange: React.PropTypes.func,
  onSetCollapse: React.PropTypes.func,
  query: React.PropTypes.object.isRequired,
  truncateFacetListsAt: React.PropTypes.number,
  value: React.PropTypes.array
};

export default ListFacet;