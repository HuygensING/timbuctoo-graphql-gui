import * as React from "react";
import DatasetCards from "./dataset-cards";

interface Props {
  loginAction: () => void;
  gotoUpload: () => void;
  isLoggedIn: boolean;
}
// (renames from UploadSplashScreen)
function FirstUpload(props: Props) {
  const { isLoggedIn, loginAction, gotoUpload} = props;

  const uploadButton = (
    <div>
      <button className="btn btn-primary btn-lg" type="button" onClick={loginAction}>
        <span className="glyphicon glyphicon-cloud-upload" /> Browse
      </button>
    </div>
  );

  const loginButton = (
    <div>
      <p>Most university accounts will work.</p>
      <button className="btn btn-primary btn-lg" type="button" onClick={gotoUpload}>
        <span className="glyphicon glyphicon-log-in" /> Log in to upload
      </button>
    </div>
  );

  return (
    <div className="container">
      <div className="jumbotron first-upload upload-bg">
        <h2>Upload your first dataset</h2>
           {isLoggedIn ? uploadButton : loginButton }
      </div>
    </div>
  );
}

export default FirstUpload;
