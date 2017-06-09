import React from "react";
import camel2label from "./camel2label";

class Field extends React.Component {
	constructor(props) {
		super(props);

		this.state = { newLabel: "", newUrl: "" };
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.entity.data._id !== this.props.entity.data._id) {
			this.setState({newLabel: "", newUrl: ""})
		}
	}

	onAdd() {
		const { name, entity, onChange } = this.props;
		if (this.state.newLabel.length > 0 && this.state.newUrl.length > 0) {
			onChange([name], (entity.data[name] || []).concat({
				label: this.state.newLabel,
				url: this.state.newUrl
			}));
			this.setState({newLabel: "", newUrl: ""});
		}
	}

	onRemove(value) {
		const { name, entity, onChange } = this.props;
		onChange([name], entity.data[name]
			.filter((val) => val.url !== value.url));
	}

	render() {
		const { name, entity, onChange } = this.props;
		const label = camel2label(name);
		const values = (entity.data[name] || []);
		const itemElements = values.map((value) => (
			<div key={value.url} className="item-element">
				<strong>
					<a href={value.url} target="_blank">
						{value.label}
					</a>
				</strong>
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
				<div style={{width: "100%"}}>
					<input type="text" className="form-control pull-left" value={this.state.newLabel}
						onChange={(ev) => this.setState({newLabel: ev.target.value})}
						placeholder="Label for url..."
						style={{display: "inline-block", maxWidth: "50%"}} />
					<input type="text" className="form-control pull-left" value={this.state.newUrl}
						onChange={(ev) => this.setState({newUrl: ev.target.value})}
						onKeyPress={(ev) => ev.key === "Enter" ? this.onAdd() : false}
						placeholder="Url..."
						style={{display: "inline-block", maxWidth: "calc(50% - 80px)"}} />
					<span className="input-group-btn pull-left">
						<button className="btn btn-default" onClick={this.onAdd.bind(this)}>Add link</button>
					</span>
				</div>

				<div style={{width: "100%", clear: "left"}} />
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
