import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Footer from './footer';

storiesOf('Footer', module)
  .add('default footer without children', () => (
    <Footer />
  ))
  .add('footer with children', () => (
    <Footer>
      <span>Child 1</span>
      <span>Child 2</span>
    </Footer>
  ))
