import React from "react";
import camel2label from "./camel2label";
import SelectField from "../../../fields/select-field";

class Field extends React.Component {

  onAdd() {
    const { entity, name,  onChange, options } = this.props;
    onChange([name], (entity.data[name] || []).concat({
      components: [{type: options[0], value: ""}]
    }));
  }

  onAddComponent(itemIndex) {
    const { entity, name,  onChange, options } = this.props;
    const currentComponents = entity.data[name][itemIndex].components;
    onChange([name, itemIndex, "components"], currentComponents
      .concat({type: options[0], value: ""})
    );
  }

  onRemoveComponent(itemIndex, componentIndex) {
    const { entity, name,  onChange } = this.props;
    const currentComponents = entity.data[name][itemIndex].components;
    onChange([name, itemIndex, "components"], currentComponents
      .filter((component, idx) => idx !== componentIndex)
    );
  }

  onChangeComponentValue(itemIndex, componentIndex, value) {
    const { entity, name,  onChange } = this.props;
    const currentComponents = entity.data[name][itemIndex].components;
    onChange([name, itemIndex, "components"], currentComponents
      .map((component, idx) => idx === componentIndex
        ? {...component, value: value} : component
    ));
  }

  onChangeComponentType(itemIndex, componentIndex, type) {
    const { entity, name,  onChange } = this.props;
    const currentComponents = entity.data[name][itemIndex].components;
    onChange([name, itemIndex, "components"], currentComponents
      .map((component, idx) => idx === componentIndex
        ? {...component, type: type} : component
    ));
  }

  onRemove(itemIndex) {
    const { entity, name,  onChange } = this.props;
    onChange([name], entity.data[name].filter((name, idx) => idx !== itemIndex));
  }

	render() {
		const { name, entity, options } = this.props;
		const label = camel2label(name);
		const values = (entity.data[name] || []);

    const nameElements = values.map((name, i) => (
      <div key={`${name}-${i}`} className="names-form item-element">
        <div className="small-margin">
          <button className="btn btn-blank btn-xs pull-right"
            onClick={() => this.onRemove(i)}
            type="button">
            <span className="glyphicon glyphicon-remove" />
          </button>
          <strong>
            {name.components.map((component) => component.value).join(" ")}
          </strong>
        </div>
        <ul>
          {name.components.map((component, j) => (
            <li key={`${i}-${j}-${component.value}`}>
              <div className="input-group">
                <div className="input-group-btn">
                  <SelectField value={component.type} noClear={true}
                    onChange={(val) => this.onChangeComponentType(i, j, val)}
                    btnClass="btn-default">
                    {options.map((option) => (
                      <span value={option} key={option}>{option}</span>
                    ))}
                  </SelectField>
                </div>
                <input type="text" className="form-control"
                  onChange={(ev) => this.onChangeComponentValue(i, j, ev.target.value)}
                  placeholder={component.type} value={component.value} />
                <span className="input-group-btn">
                  <button className="btn btn-default" onClick={() => this.onRemoveComponent(i, j)} >
                    <span className="glyphicon glyphicon-remove" />
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
          <button onClick={() => this.onAddComponent(i)}
             className="btn btn-default btn-xs pull-right" type="button">
            Add component
          </button>
          <div style={{width: "100%", height: "6px", clear: "right"}} />
      </div>
    ))
		return (
			<div className="basic-margin">
				<h4>{label}</h4>
        {nameElements}
        <button className="btn btn-default" onClick={this.onAdd.bind(this)}>
          Add name
        </button>
			</div>
		);
	}
}

Field.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
  options: React.PropTypes.array,
	onChange: React.PropTypes.func
};

export default Field;
