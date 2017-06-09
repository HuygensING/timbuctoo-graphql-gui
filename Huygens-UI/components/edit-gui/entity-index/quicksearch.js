import React from "react";

export default function(props) {
  const { onQuickSearchQueryChange, onQuickSearch, query } = props;

  return (
    <div className="input-group small-margin ">
      <input type="text" placeholder="Search for..." className="form-control"
        onChange={(ev) => onQuickSearchQueryChange(ev.target.value)}
        onKeyPress={(ev) => ev.key === "Enter" ? onQuickSearch() : false}
        value={query}
        />
      <span className="input-group-btn">
        <button className="btn btn-default" onClick={onQuickSearch}>
          <span className="glyphicon glyphicon-search" />
        </button>
        <button className="btn btn-blank" onClick={() => { onQuickSearchQueryChange(""); onQuickSearch(); }}>
          <span className="glyphicon glyphicon-remove" />
        </button>
      </span>
    </div>
  );
}
