import React from "react";


class CurrentQuery extends React.Component {


  removeListFacetValue(field, values, value) {
    const foundIdx = values.indexOf(value);
    if (foundIdx > -1) {
      this.props.onChange(field, values.filter((v, i) => i !== foundIdx));
    }
  }

  removeRangeFacetValue(field) {
    this.props.onChange(field, []);
  }

  removeTextValue(field) {
    this.props.onChange(field, "");
  }

  renderFieldValues(searchField) {

    switch (searchField.type) {
      case "list-facet": return searchField.value.map((val, i) => (
        <span key={`${searchField.field}-${i}`}>
          <span className="btn btn-primary btn-sm downcase-then-capitalize" onClick={() => this.removeListFacetValue(searchField.field, searchField.value, val)}
                title={`${searchField.label}: ${val}`}>
            {val}{" "}
            <span className="glyphicon glyphicon-remove-sign hi-half-transp" />
          </span>{" "}
        </span>
      ));

      case "range-facet": return (
        <span key={`${searchField.field}`}>
          <span className="btn btn-primary btn-sm downcase-then-capitalize" onClick={() => this.removeRangeFacetValue(searchField.field)}
                title={`${searchField.label}: ${searchField.value[0]} - ${searchField.value[1]}`} >
            {searchField.value[0]} - {searchField.value[1]}{" "}
            <span className="glyphicon glyphicon-remove-sign hi-half-transp" />
          </span>{" "}
        </span>
      );

      case "text": return (
        <span key={`${searchField.field}`}>
          <span className="btn btn-primary btn-sm downcase-then-capitalize" onClick={() => this.removeTextValue(searchField.field)}
                title={`${searchField.label}: ${searchField.value}`}>
            {searchField.value}{" "}
            <span className="glyphicon glyphicon-remove-sign hi-half-transp" />
          </span>{" "}
        </span>
      );
    }
    return null;
  }

  render() {
    const { searchFields } = this.props;

    return (
      <div>
        {searchFields
              .filter((searchField) => searchField.value && searchField.value.length > 0)
              .map((searchField) => (
                this.renderFieldValues(searchField)
              ))
        }
      </div>
    );
  }
}

CurrentQuery.propTypes = {
  onChange: React.PropTypes.func,
  searchFields: React.PropTypes.array
};

export default CurrentQuery;