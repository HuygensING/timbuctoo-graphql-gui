import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import FirstUpload from './firstUpload.jsx';

storiesOf('first upload jumbotron', module)
  .add('not logged in', () => (
    <FirstUpload __MockOnLogin={action('LOGGED IN VIA SAML')} />
  ))
  .add('without excel example', () => (
    <FirstUpload onUploadFileSelect={action("onUpload")}  userId="user" isUploading={false} />
  ))
  .add('with excel example', () => (
    <FirstUpload onUploadFileSelect={action("onUpload")} exampleSheetUrl="/foo/bar.xls" userId="user" isUploading={false}/>
  ))
  .add('uploading', () => (
    <FirstUpload onUploadFileSelect={action("onUpload")} exampleSheetUrl="/foo/bar.xls" userId="user" isUploading={true}/>
  ));