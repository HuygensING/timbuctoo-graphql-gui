import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
declare var module: any; //when webpack compiles it provides a module variable

storiesOf('Button', module)
  .add('with text', () => (
    <button onClick={action("clicked")}>Hello Button</button>
  ))
  .add('with some emoji', () => (
    <button onClick={action('clicked')}>😀 😎 👍 💯</button>
  ));