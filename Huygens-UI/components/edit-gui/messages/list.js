import React from "react";
import cx from "classnames";
import Message from "../../message";

const LABELS = {
	"SUCCESS_MESSAGE": "",
	"ERROR_MESSAGE": (
		<span>
			<span className="glyphicon glyphicon-exclamation-sign" /> Warning!
		</span>
	)
};

const ALERT_LEVELS = {
	"SUCCESS_MESSAGE": "info",
	"ERROR_MESSAGE": "danger"
};

class Messages extends React.Component {
	render() {
		const { messages, types, onDismissMessage } = this.props;

		const filteredMessages = messages.log
			.map((msg, idx) => ({message: msg.message, index: idx, type: msg.type, dismissed: msg.dismissed }))
			.filter((msg) => types.indexOf(msg.type) > -1 && !msg.dismissed);

		return (
			<div>
				{filteredMessages.map((msg) => (
					<Message key={msg.index}
						dismissible={true}
						alertLevel={ALERT_LEVELS[msg.type]}
						onCloseMessage={() => onDismissMessage(msg.index)}>
						<strong>{LABELS[msg.type]}</strong> <span>{msg.message}</span>
					</Message>
				))}
			</div>
		);
	}
}

Messages.propTypes = {
	messages: React.PropTypes.object,
	onDismissMessage: React.PropTypes.func.isRequired,
	types: React.PropTypes.array.isRequired
};

export default Messages;
