import * as React from "react";
import DatasetCards from "./dataset-cards";
import config from "../config";

interface Props {
  loginAction: () => void;
  gotoUpload: () => void;
  isLoggedIn: boolean;
  dataSets: { [key: string]: { [key: string]: string } };
  userId?: string;
}
// (renames from UploadSplashScreen)
function FirstUpload(props: Props) {
  const { isLoggedIn, gotoUpload } = props;

  const uploadButton = (
    <div>
      <button className="btn btn-primary btn-lg" type="button" onClick={gotoUpload}>
        <span className="glyphicon glyphicon-cloud-upload" /> Upload
      </button>
    </div>
  );

  const loginButton = (
    <form action="https://secure.huygens.knaw.nl/saml2/login" method="POST">
      <input name="hsurl" type="hidden" value={window.location.href} />
      <p>Most university accounts will work.</p>
      <button className="btn btn-primary btn-lg" type="submit">
        <span className="glyphicon glyphicon-log-in" /> Log in to upload
      </button>
    </form>
  );

  const dataSets = Object.keys(props.dataSets)
    .map(userId =>
      Object.keys(props.dataSets[userId]).map(function(dataSetId) {
        return { userId, dataSetId };
      }),
    )
    .reduce((prev, cur) => prev.concat(cur), []);

  return (
    <div className="container">
      <div className="jumbotron first-upload upload-bg">
        <h2>Upload a dataset</h2>
        {isLoggedIn ? uploadButton : loginButton}
      </div>
      <div className="row">
        {dataSets.map(dataSet =>
          <div className="card-dataset" style={{ height: "120px" }}>
            <a
              className="card-dataset btn btn-default explore"
              title={dataSet.dataSetId}
              href={dataSet.userId === props.userId ? "#/upload/" + dataSet.dataSetId : undefined}
            >
              <strong
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  width: "90%",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {dataSet.dataSetId.replace(/-+/, " ")}
              </strong>
            </a>
          </div>,
        )}
      </div>
    </div>
  );
}

export default FirstUpload;
