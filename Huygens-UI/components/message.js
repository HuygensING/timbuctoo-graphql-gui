import React from "react";
import cx from "classnames";

export default function(props) {
  const { dismissible, alertLevel, onCloseMessage} = props;
  const dismissButton = dismissible
    ? <button type="button" className="close" onClick={onCloseMessage}><span>&times;</span></button>
    : null;

  return (
    <div className={cx("alert", `alert-${alertLevel}`, {"alert-dismissible": dismissible})} role="alert">
      {dismissButton}
      {props.children}
    </div>
  )
};