import React from "react";
import camel2label from "./camel2label";
import SelectField from "../../../fields/select-field";

class Field extends React.Component {
	render() {
		const { name, entity, onChange, options } = this.props;
		const label = camel2label(name);
		const itemElement = entity.data[name] && entity.data[name].length > 0 ? (
			<div className="item-element">
				<strong>{entity.data[name]}</strong>
				<button className="btn btn-blank btn-xs pull-right"
					onClick={() => onChange([name], "")}>
					<span className="glyphicon glyphicon-remove" />
				</button>
			</div>
		) : null;

		return (
			<div className="basic-margin">
				<h4>{label}</h4>
				{itemElement}
				<SelectField
					onChange={(value) => onChange([name], value)}
					noClear={true} btnClass="btn-default">
					<span type="placeholder">
						Select {label.toLowerCase()}
					</span>
					{options.map((option) => (
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
