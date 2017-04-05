__webpack_public_path__ = "/storybook/";

import { configure, setAddon, addDecorator, storiesOf, action, linkTo } from "@kadira/storybook";
import { withKnobs, text, boolean, number, color, object, array, select, date } from '@kadira/storybook-addon-knobs';
import React from 'react';

setAddon(infoAddon);
// addDecorator(sourceDecorator);
addDecorator(withKnobs);

function Node({key, depth, node}) {
  return <span>&lt;{node.type} {Object.keys(node.props).filter(x=> x !== "children").map(x=> `${x}="${node.props[x]}"`)}&gt;</span>
}

function sourceDecorator(story) {
  var sub = story()
  return (
      <div>
        {sub}
        <pre>
          <Node depth={0} node={sub} />
        </pre>
      </div>
    );
}

const req = require.context('../../app', true, /.story.(j|t)sx?$/)

configure(function () {
  req.keys().forEach(filename => req(filename).default({
    storiesOf, 
    action, 
    linkTo, 
    knobs: {
      text,
      boolean,
      number,
      color,
      object,
      array,
      select,
      date
    }
  }))
}, module);
