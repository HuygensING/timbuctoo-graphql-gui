import React from "react";
import camel2label from "./camel2label";

class Field extends React.Component {
	constructor(props) {
		super(props);

		this.state = { newValue: "" };
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.entity.data._id !== this.props.entity.data._id) {
			this.setState({newValue: ""})
		}
	}

	onAdd(value) {
		const { name, entity, onChange } = this.props;
		onChange([name], (entity.data[name] || []).concat(value));
	}

	onRemove(value) {
		const { name, entity, onChange } = this.props;
		onChange([name], entity.data[name].filter((val) => val !== value));
	}

	render() {
		const { name, entity, onChange } = this.props;
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
				<input type="text" className="form-control" value={this.state.newValue}
					onChange={(ev) => this.setState({newValue: ev.target.value})}
					onKeyPress={(ev) => ev.key === "Enter" ? this.onAdd(ev.target.value) : false}
					placeholder="Add a value..." />
			</div>
		);
	}
}

Field.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func
};

export default Field;
