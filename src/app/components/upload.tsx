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
  remoteSets: [],
  files: [],
  userId: "jauco",
  baseUri: "http://localhost:8080/v5/",
  availableColors: [
    "#ce7060",
    "#92e3fc",
    "#fade8d",
    "#9ce479",
    "#e39061",
    "#d3b2d6",
    "#95cac4",
  ],
};

export function Upload(props: {
  state: {
    title?: string;
    fileIsBeingAdded?: "xlsx" | "csv" | "mdb" | "dataperfect" | "rs";
    remoteSets: string[];
    remoteUri?: string;
    files: string[];
    description?: string;
    provenance?: string;
    color?: string;
    availableColors: string[];
  };
}) {
  const {
    title,
    fileIsBeingAdded,
    remoteUri,
    files,
    remoteSets,
    description,
    provenance,
    color,
    availableColors,
  } = props.state;
  let fileAddInfo = null;
  if (fileIsBeingAdded) {
    switch (fileIsBeingAdded) {
      case "xlsx":
        fileAddInfo = (
          <UploadForm title="Upload Excel">
            <StyledFileInput accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
          </UploadForm>
        );
        break;
      case "csv":
        fileAddInfo = (
          <UploadForm title="Upload CSV">
            <StyledFileInput accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
          </UploadForm>
        );
        break;
      case "mdb":
        fileAddInfo = (
          <UploadForm title="Upload MS Access">
            <StyledFileInput accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
          </UploadForm>
        );
        break;
      case "dataperfect":
        fileAddInfo = (
          <UploadForm title="Upload DataPerfect">
            <StyledFileInput accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
          </UploadForm>
        );
        break;
      case "rs":
        fileAddInfo = (
          <UploadForm title="Import dataset via resource sync discovery">
            <div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    value={remoteUri}
                    className="form-control"
                    placeholder="Enter discovery url"
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                      <span
                        className="glyphicon glyphicon-search"
                        aria-hidden="true"
                      />
                    </button>
                  </span>
                </div>
              </div>
              <div className="list-group">
                {remoteSets.map((remoteUrl, i) =>
                  <button
                    type="button"
                    className="list-group-item"
                    key={remoteUrl}
                  >
                    {remoteUrl}
                  </button>,
                )}
              </div>
            </div>
          </UploadForm>
        );
        break;
      default:
        assertNever(fileIsBeingAdded);
    }
  }
  return (
    <div>
      <div className="form-horizontal">
        <div className="col-md-12" style={{ marginBottom: 15 }}>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h4>Files: </h4>
          <ul>
            {files.map(file => <li>{file}</li>)}
          </ul>
          {fileIsBeingAdded ? fileAddInfo : null}
          <DropdownButton bsStyle="primary" title="Add..." id="addFileButton">
            {" "}{/*onSelect*/}
            <MenuItem eventKey="xlsx">MS Excel (*.xlsx)</MenuItem>
            <MenuItem eventKey="csv">Comma separated values (*.csv)</MenuItem>
            <MenuItem eventKey="mdb">MS Access (*.mdb)</MenuItem>
            <MenuItem eventKey="dataperfect">
              Dataperfect (a zip containing all the files)
            </MenuItem>
            <MenuItem eventKey="rs">
              Download dataset from a clariah server
            </MenuItem>
          </DropdownButton>
        </div>
        <div className="col-md-6">
          <h4>Color</h4>
          {availableColors.map(colorCode =>
            <a
              key={colorCode}
              style={{
                float: "left",
                width: "40px",
                cursor: "pointer",
                fontWeight: colorCode === color ? 500 : 300,
              }}
            >
              <span
                style={{
                  borderRadius: colorCode === color ? "8px" : "12px",
                  display: "inline-block",
                  border: `8px solid ${colorCode === color
                    ? `#${colorCode}`
                    : "white"}`,
                  width: "40px",
                  height: "40px",
                  backgroundColor: colorCode,
                }}
              />{" "}
            </a>,
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h4>Description: </h4>
          <textarea
            rows={10}
            className="form-control"
            placeholder="Enter a description..."
            value={description}
          />
        </div>
        <div className="col-md-6">
          <h4>Provenance: </h4>
          <textarea
            rows={10}
            className="form-control"
            placeholder="Please describe where the data came from..."
            value={provenance}
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: 15 }}>
        <div className="col-md-1 col-md-offset-11">
          <Button bsStyle="primary">Save</Button>
        </div>
      </div>
    </div>
  );
}
