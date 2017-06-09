import React from "react";
import camel2label from "./camel2label";

class RelationField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      suggestions: []
    }
  }

  onRemove(value) {
    const currentValues = this.props.entity.data["@relations"][this.props.name] || [];

    this.props.onChange(
      ["@relations", this.props.name],
      currentValues.filter((curVal) => curVal.id !== value.id)
    );

  }

  onAdd(suggestion) {
    const currentValues = this.props.entity.data["@relations"][this.props.name] || [];
    if (currentValues.map((val) => val.id).indexOf(suggestion.key) > -1) {
      return;
    }
    this.props.onChange(
      ["@relations", this.props.name],
      currentValues.concat({
        id: suggestion.key,
        displayName: suggestion.value,
        accepted: true
      })
    );
  }

  onQueryChange(ev) {
    const { getAutocompleteValues, path } = this.props;
    this.setState({query: ev.target.value});
    getAutocompleteValues(path, ev.target.value, (results) => {
      this.setState({suggestions: results})
    });
  }

  render() {
    const { name, entity, onChange } = this.props;
    const values = entity.data["@relations"][this.props.name] || [];
    const itemElements = values.filter((val) => val.accepted).map((value, i) => (
      <div key={`${i}-${value.id}`} className="item-element">
        <strong>{value.displayName}</strong>
        <button className="btn btn-blank btn-xs pull-right"
          onClick={() => this.onRemove(value)}>
          <span className="glyphicon glyphicon-remove" />
        </button>
      </div>
    ));

    return (
      <div className="basic-margin">
        <h4>{camel2label(name)}</h4>
        {itemElements}
        <input className="form-control" onChange={this.onQueryChange.bind(this)}
          value={this.state.query} placeholder="Search..." />
        <div style={{overflowY: "auto", maxHeight: "300px"}}>
          {this.state.suggestions.map((suggestion) => (
            <a key={suggestion.key} className="item-element"
              onClick={() => this.onAdd(suggestion)}>
              {suggestion.value}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default RelationField;
