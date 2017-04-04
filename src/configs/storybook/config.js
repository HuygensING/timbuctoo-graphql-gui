__webpack_public_path__ = "/storybook/";

import { configure } from '@kadira/storybook';

function loadStories() {
  require('../../app/components/entity.story');
}

configure(loadStories, module);