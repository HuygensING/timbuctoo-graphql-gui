import React from "react";
import camel2label from "./camel2label";
import SelectField from "../../../fields/select-field";

class Field extends React.Component {

	onAdd(value) {
		const { name, entity, onChange } = this.props;
		onChange([name], (entity.data[name] || []).concat(value));
	}

	onRemove(value) {
		const { name, entity, onChange } = this.props;
		onChange([name], entity.data[name].filter((val) => val !== value));
	}

	render() {
		const { name, entity, onChange, options } = this.props;
		const label = camel2label(name);
		const values = (entity.data[name] || []);
		const itemElements = values.map((value) => (
			<div key={value} className="item-element">
				<strong>{value}</strong>
				<button className="btn btn-blank btn-xs pull-right"
					onClick={() => this.onRemove(value)}>
					<span className="glyphicon glyphicon-remove" />
				</button>
			</div>
		));

		return (
			<div className="basic-margin">
				<h4>{label}</h4>
				{itemElements}
				<SelectField onChange={this.onAdd.bind(this)} noClear={true} btnClass="btn-default">
					<span type="placeholder">
						Select {label.toLowerCase()}
					</span>
					{options.filter((opt) => values.indexOf(opt) < 0).map((option) => (
						<span key={option} value={option}>{option}</span>
					))}
				</SelectField>
			</div>
		);
	}
}

Field.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	options: React.PropTypes.array
};

export default Field;
