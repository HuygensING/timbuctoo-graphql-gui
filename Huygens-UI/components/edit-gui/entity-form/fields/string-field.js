import React from "react";
import camel2label from "./camel2label";

class StringField extends React.Component {
	render() {
		const { name, entity, onChange } = this.props;
		const label = camel2label(name);

		return (
			<div className="basic-margin">
				<h4>{label}</h4>
				<input className="form-control"
					onChange={(ev) => onChange([name], ev.target.value)}
					value={entity.data[name] || ""}
					placeholder={`Enter ${label.toLowerCase()}`}
				/>
			</div>
		);
	}
}

StringField.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func
};

export default StringField;
