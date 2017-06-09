import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';
import CollectionOverview from './collection-overview';

const data = {
  isUploading: false,
  vres: {
    'VreA': {name: 'My first VRE'},
    'VreB': {name: 'My second VRE'}
  },
  userId: "asd"
};

storiesOf('CollectionOverview', module)
  .add('not uploading', () => (
    <CollectionOverview
      {...data}
      onUploadFileSelect={linkTo("CollectionOverview", "uploading")}
    />
  ))
  .add('uploading', () => (
    <CollectionOverview
      {...{...data, isUploading: true}}
    />
  ));
