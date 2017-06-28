import * as React from 'react'; // tslint:disable-line no-unused-variable
import * as ReactDOM from 'react-dom';
import App from './App';
import {Router} from './routing/containers/Router';

ReactDOM.render(
	<App><Router/></App>,
	document.getElementById('root')
);
