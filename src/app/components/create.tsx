import * as React from "react";
import { Button, DropdownButton, MenuItem, Modal } from "react-bootstrap";

function assertNever(action: never): void {
  console.error("Unhandled case", action);
}

function StyledFileInput(props: { accept: string }) {
  return (
    <label className="btn btn-primary">
      select file
      <input
        accept={props.accept}
        type="file"
        name="file"
        style={{
          width: 0.1,
          height: 0.1,
          opacity: 0,
          overflow: "hidden",
          position: "absolute",
        }}
      />
    </label>
  );
}

function UploadForm(props: { children?: any; title: string }) {
  return (
    <Modal show={true} onHide={() => {}}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button>Cancel</Button>
        <Button bsStyle="primary">Upload</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const defaultValues = {
  userId: "jauco",
  baseUri: "http://localhost:8080/v5/",
};

export function Create(props: {
  state: {
    title?: string;
    titleIsDuplicate?: boolean;
    userId: string;
    baseUri: string;
    dataSetId?: string;
  };
}) {
  const { title, titleIsDuplicate, userId, baseUri, dataSetId } = props.state;
  const datasetUrl = baseUri + userId + "/" + dataSetId + "/";
  return (
    <div>
      <div className="form-horizontal">
        <div className="col-md-10 col-md-offset-1" style={{ marginBottom: 15 }}>
          <h2>Create new Dataset</h2>

          <fieldset
            style={{ marginBottom: 5 }}
            className={
              "form-group" + (titleIsDuplicate ? " has-error has-feedback" : "")
            }
          >
            <label className="control-label">Title: </label>
            <div className="input-group">
              <span className="input-group-addon">{userId}/</span>
              <input
                className="form-control"
                type="text"
                placeholder="the title of your dataset"
                value={title}
              />
              {titleIsDuplicate
                ? <span
                    className="glyphicon glyphicon-remove form-control-feedback"
                    aria-hidden="true"
                  />
                : null}
            </div>
            {titleIsDuplicate
              ? <span className="help-block">
                  You already have dataset with id <code>{dataSetId}</code>.
                </span>
              : null}
            {!titleIsDuplicate &&
              title &&
              dataSetId !== title.replace(/ /g, "-").toLowerCase()
              ? <span className="help-block">
                  The url of your dataset will be:{" "}
                  <a href={datasetUrl}>
                    {title && title.length ? datasetUrl : ""}
                  </a>
                </span>
              : null}
          </fieldset>
          <Button
            bsStyle="success"
            className="pull-right"
            disabled={title == null}
          >
            create
          </Button>
        </div>
      </div>
    </div>
  );
}
