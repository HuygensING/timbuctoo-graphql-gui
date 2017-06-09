import React from "react";
import SelectField from "../fields/select-field";

class AddProperty extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newName: "",
      newType: null
    };
  }


  render() {
    const { newName, newType } = this.state;
    const { onAddCustomProperty, archetypeFields, availableArchetypes } = this.props;

    const relationTypeOptions = archetypeFields
      .filter((prop) => prop.type === "relation")
      .filter((prop) => availableArchetypes.indexOf(prop.relation.targetCollection) > -1)
      .map((prop) => <span key={prop.name} value={prop.name}>{prop.name}</span>);

    return (
      <div className="row small-margin">
        <div className="col-sm-2">
          {newType === "relation"
            ? (
              <SelectField
                value={newName}
                onChange={(value) => this.setState({newName: value})}
                onClear={() => this.setState({newName: ""})}>
                <span type="placeholder">Choose a relation type...</span>
                {relationTypeOptions}
              </SelectField>
            ) : (
              <input className="form-control"
                      onChange={(ev) => this.setState({newName: ev.target.value})}
                      placeholder="Property name"
                      value={newName}
                      disabled={newType !== "text"}/>
            )
          }
        </div>
        <div className="col-sm-2" >
          <span className="pull-right">
            <SelectField
              value={newType}
              onChange={(value) => this.setState({newType: value, newName: value === "relation" ? null : newName})}
              onClear={() => this.setState({newType: null})}>
              <span type="placeholder">Choose a type...</span>
              <span value="text">Text</span>
              <span value="relation">Relation</span>
            </SelectField>
          </span>
        </div>
        <div className="col-sm-6">
        </div>
        <div className="col-sm-2">

          <button className="pull-right btn btn-default" disabled={!(newName && newType)}
                  onClick={() => {
                    this.setState({newName: null, newType: null});
                    onAddCustomProperty(newName, newType);
                  }}>
            Add property
          </button>
        </div>
      </div>
    )
  }
}

AddProperty.propTypes = {
  importData: React.PropTypes.object,
  mappings: React.PropTypes.object,
  onAddCustomProperty: React.PropTypes.func
};

export default AddProperty;
