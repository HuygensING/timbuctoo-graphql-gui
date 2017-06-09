import React from 'react';
import Page from './page.jsx'
import FirstUpload from './firstUpload.jsx'
import ConnectToArchetype from "./connect-to-archetype";
import ConnectData from "./connect-data";
import Message from "./message";
import UploadButton from "./upload-button";
import CollectionOverview from "./collection-overview";

class App extends React.Component {

  render() {
    const hasVres = Object.keys(this.props.userdata.myVres).length > 0;
    const { location: { pathname }, importData: { sheets, uploadedFileName }, onUploadFileSelect, onCloseMessage } = this.props;

    const fileIsUploadedMessage = this.props.showFileIsUploadedMessage ? (
      <Message alertLevel="info" dismissible={true} onCloseMessage={() => onCloseMessage("showFileIsUploadedMessage")}>
        <em>{uploadedFileName}</em> is uploaded.
      </Message>
    ) : null;

    const publishFailedMessage = this.props.importData.publishErrors ? (
      <Message alertLevel="danger" dismissible={false}>
        <UploadButton classNames={["btn", "btn-danger", "pull-right", "btn-xs"]} label="Re-upload"
                      onUploadFileSelect={onUploadFileSelect} />
        <span className="glyphicon glyphicon-exclamation-sign" />{" "}
        Publish failed. Please fix the mappings or re-upload the data.
      </Message>
    ) : null;

    const collectionsAreConnectedMessage = this.props.showCollectionsAreConnectedMessage ?
      <Message alertLevel="info" dismissible={true} onCloseMessage={() => onCloseMessage("showCollectionsAreConnectedMessage")}>
        {sheets.map((sheet) => <em key={sheet.collection}>{sheet.collection}</em>)
          .reduce((accu, elem) => accu === null ? [elem] : [...accu, ' and ', elem], null)
        } from <em>{uploadedFileName}</em> are connected to the Timbuctoo Archetypes.
      </Message> : null;

    if (pathname === "/") {
      return (
        <Page username={this.props.userdata.userId} vres={this.props.userdata.vres} showDatasets={true}>
          {hasVres
            ? <CollectionOverview
                onUploadFileSelect={this.props.onDataSetUpload}
                isUploading={this.props.importData.isUploading}
                userId={this.props.userdata.userId}
                vres={this.props.userdata.myVres}
              />
            : <FirstUpload
                __MockOnLogin={this.props.onLogin}
                onUploadFileSelect={this.props.onDataSetUpload}
                isUploading={this.props.importData.isUploading}
                userId={this.props.userdata.userId}
              />
          }
        </Page>
      );
    } else if (pathname === "/maparchetypes") {
      return (
        <Page username={this.props.userdata.userId} vres={this.props.userdata.vres} showDatasets={false}>
          <div className="container basic-margin">
            <h2 className="small-margin">Upload and connect your dataset</h2>
            {fileIsUploadedMessage}
            <p>We found {sheets.length} collections in the file. Connect the tabs to the Timbuctoo Archetypes.</p>
          </div>

          <ConnectToArchetype
            mappings={this.props.mappings}
            sheets={this.props.importData.sheets}
            uploadedFileName={this.props.importData.uploadedFileName}
            archetype={this.props.archetype}
            onMapCollectionArchetype={this.props.onMapCollectionArchetype}
            onConfirmCollectionArchetypeMappings={this.props.onConfirmCollectionArchetypeMappings}
          />
        </Page>
      );
    } else if (pathname === "/mapdata") {
      return (
        <Page username={this.props.userdata.userId} vres={this.props.userdata.vres} showDatasets={false}>
          <div className="container basic-margin">
            <h2 className="small-margin">Upload and connect your dataset</h2>
            {collectionsAreConnectedMessage}
            {publishFailedMessage}
            <p>Connect the excel columns to the properties of the Archetypes</p>
          </div>
          <ConnectData
            {...this.props}
          />
        </Page>
      );  } else {
      return (<div />);
    }
  }
}

export default App;
