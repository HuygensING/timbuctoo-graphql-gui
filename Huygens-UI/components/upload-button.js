import React from "react";
import cx from "classnames";

class UploadButton extends React.Component {

  render() {
    const { classNames, isUploading, onUploadFileSelect, glyphicon, label } = this.props;
    return (
      <form>
        <label className={cx(...classNames, {disabled: isUploading})}>
          <span className={glyphicon}></span>
          {" "}
          {isUploading ? "Uploading..." : label }
          <input
            disabled={isUploading}
            onChange={e => onUploadFileSelect(e.target.files)}
            style={{display: "none"}}
            type="file" />
        </label>
      </form>
    );
  }
}

export default UploadButton;