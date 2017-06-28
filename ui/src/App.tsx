import * as React from 'react'; // tslint:disable-line no-unused-variable
import * as styles from './App.pcss';
import {SPC} from './lib/SPC';

const logo = require('./logo.svg');

export default class App extends SPC<{}> {
	render() {
		return (
			<div className={styles.App}>
				<div className={styles.header}>
					<img src={logo} className={styles.logo} alt='logo'/>
					<h2>Welcome to Todos</h2>
				</div>
				{this.props.children}
			</div>
		);
	}
}
