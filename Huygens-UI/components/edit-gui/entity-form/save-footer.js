import React from "react";

export default function(props) {
  const { onSave, onCancel } = props;

  return (
    <div>
      <button className="btn btn-primary" onClick={onSave}>Save</button>
      {" "}or{" "}
      <button className="btn btn-link" onClick={onCancel}>Cancel</button>
    </div>
  );
}
