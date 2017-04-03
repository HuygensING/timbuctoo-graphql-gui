__webpack_public_path__ = "/storybook/";

import { configure, storiesOf } from "@kadira/storybook";

configure(function () {
  require('../../app/components/test.story').default({storiesOf, action})
}, module);
