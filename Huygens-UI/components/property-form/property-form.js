import React from "react";

import Text from "./text";
import Relation from "./relation";


const typeMap = {
  text: (props) => <Text {...props} />,
  datable: (props) => <Text {...props} />,
  relation: (props) => <Relation {...props} />
};

class PropertyForm extends React.Component {

  canConfirm(variable) {
    const { type } = this.props;
    if (!variable || variable.length === 0) { return false; }
    if (type === "relation") {
      return variable[0].variableName && variable[0].targetCollection && variable[0].targetVariableName;
    }
    return variable.filter((m) => m.variableName).length === variable.length;
  }

  render() {
    const { name, type, custom, propertyMapping } = this.props;
    const { onRemoveCustomProperty, onConfirmFieldMappings,
      onUnconfirmFieldMappings, onSetFieldMapping, onClearFieldMapping } = this.props;

    const confirmed = propertyMapping && propertyMapping.confirmed;

    const confirmButton = propertyMapping && this.canConfirm(propertyMapping.variable) && !confirmed ?
      <button className="btn btn-success" onClick={() => onConfirmFieldMappings(name)}>Confirm</button> : confirmed ?
      <button className="btn btn-blank" onClick={() => onUnconfirmFieldMappings(name)}>
        <span className="hi-success glyphicon glyphicon-ok" /></button> : null;

    const formComponent = typeMap[type]({
      ...this.props,
      onColumnSelect: (value) => onSetFieldMapping(name, value),
      onClearColumn: (valueIdx) => onClearFieldMapping(name, valueIdx)
    });

    return (
      <div className="row small-margin">
        <div className="col-sm-2 pad-6-12"><strong>{name}</strong></div>
        <div className="col-sm-2 pad-6-12" ><span className="pull-right">({type})</span></div>
        <div className="col-sm-5">
          {formComponent}
        </div>
        <div className="col-sm-1">
          { custom
            ? (<button className="btn btn-blank pull-right" type="button" onClick={() => onRemoveCustomProperty(name)}>
            <span className="glyphicon glyphicon-remove"/>
          </button>)
            : null }
        </div>
        <div className="col-sm-2 hi-success">

          <span className="pull-right">
            {confirmButton}
          </span>
        </div>
      </div>
    );
  }
}

export default PropertyForm;