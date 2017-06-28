import * as React from 'react'; // tslint:disable-line no-unused-variable
import {SPC} from './lib/SPC';
import {Link} from './routing/containers/Link';

class Home extends SPC<{}> {
	render() {
		return (
			<div>
				<h1><Link routeName='todosRxJS'>todos-rxjs</Link></h1>
				<h1><Link routeName='todosRecompose'>todos-recompose</Link></h1>
			</div>
		);
	}
}

export default Home;
