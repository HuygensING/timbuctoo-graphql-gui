import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Message from './message';

storiesOf('Message', module)
  .add('dismissible info message', () => (
    <Message dismissible={true} alertLevel="info" onCloseMessage={action("closing message")}>
      <em>one</em> and <em>two</em> makes <strong><em>three</em></strong>
    </Message>
  ))
  .add('undismissible error message', () => (
    <Message dismissible={false} alertLevel="danger">
      <strong>Important notice</strong>: <em>one</em> and <em>two</em> does <strong>not</strong> make <em>four</em>
    </Message>
  ));