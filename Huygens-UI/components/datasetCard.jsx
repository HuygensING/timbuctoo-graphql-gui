import React from 'react';

function DataSetCard(props) {
  return (
    <div className="card-dataset">
      <div className="card-dataset btn btn-default explore">Explore<br />
        <strong>{props.caption}</strong>
      </div>
      {props.userId
        ? (<div className="card-dataset btn btn-default">
            <span className="glyphicon glyphicon-pencil" />{" "}
            Edit
          </div>)
        : null}
    </div>
  );
}

export default DataSetCard;
