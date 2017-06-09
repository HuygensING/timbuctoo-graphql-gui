import React from "react";

export default function(props) {
  const { onPaginateLeft, onPaginateRight } = props;
  const { start, rows, listLength } = props;



  return (
    <div>
      <button className="btn btn-default" disabled={start === 0} onClick={onPaginateLeft}>
        <span className="glyphicon glyphicon-chevron-left" />
      </button>
      {" "}{start + 1} - {start + rows}{" "}
      <button className="btn btn-default" disabled={listLength < rows} onClick={onPaginateRight}>
        <span className="glyphicon glyphicon-chevron-right" />
      </button>
    </div>
  );
}
