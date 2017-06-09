import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Header from './header';
import {Resultslistheader} from './hi-resultlist';

storiesOf('HI-interface components', module)
	.add('HI-tool header', () => (
		<Header projectId="timbuctoo" />
	)).add('HI-resultslist header', () => (
		<Resultslistheader />
	))