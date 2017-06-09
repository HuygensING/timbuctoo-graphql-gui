import React from "react"

import StringField from "./fields/string-field";
import SelectField from "./fields/select";
import MultiSelectField from "./fields/multi-select";
import RelationField from "./fields/relation";
import StringListField from "./fields/list-of-strings";
import LinkField from "./fields/links";
import NamesField from "./fields/names";

const fieldMap = {
	"string": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
	"text": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
	"datable": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
	"multiselect": (fieldDef, props) => (<MultiSelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"select": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"relation": (fieldDef, props) => (<RelationField {...props} name={fieldDef.name} path={fieldDef.quicksearch} />),
  "list-of-strings": (fieldDef, props) => (<StringListField {...props} name={fieldDef.name} />),
  "links": (fieldDef, props) => (<LinkField {...props} name={fieldDef.name} />),
	"names": (fieldDef, props) => (<NamesField {...props} name={fieldDef.name} options={fieldDef.options} />)
};

class EntityForm extends React.Component {

  render() {
    const { onNew, onDelete, onChange, getAutocompleteValues } = this.props;
    const { entity, currentMode, properties, entityLabel } = this.props;


    return (
      <div className="col-sm-6 col-md-8">
        <div className="basic-margin">
          <button className="btn btn-primary pull-right" onClick={() => onNew(entity.domain)}>
            New {entityLabel}
          </button>
        </div>
        {properties
          .filter((fieldDef) => !fieldMap.hasOwnProperty(fieldDef.type))
          .map((fieldDef, i) => (<div key={i} style={{"color": "red"}}><strong>Field type not supported: {fieldDef.type}</strong></div>))}
        {properties
          .filter((fieldDef) => fieldMap.hasOwnProperty(fieldDef.type))
          .map((fieldDef, i) =>
          fieldMap[fieldDef.type](fieldDef, {
						key: `${i}-${fieldDef.name}`,
						entity: entity,
						onChange: onChange,
						getAutocompleteValues: getAutocompleteValues
					})
        )}
        {currentMode === "edit"
          ? (<div className="basic-margin">
              <h4>Delete</h4>
              <buton className="btn btn-danger" onClick={onDelete}>
                Delete {entityLabel}
              </buton>
            </div>
          ) : null}
      </div>
    )
  }
}

export default EntityForm;
