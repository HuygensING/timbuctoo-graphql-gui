import React from "react";

export default function(props) {
  const { start, list, onSelect, domain } = props;
  return (
    <div className="result-list result-list-edit">
      <ol start={start + 1} style={{counterReset: `step-counter ${start}`}}>
        {list.map((entry, i) => (
          <li key={entry._id} onClick={() => onSelect({domain: domain, id: entry._id})}>
            <a>
              {entry["@displayName"]}
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
