import * as React from 'react'; // tslint:disable-line no-unused-variable
import {SPC} from '../../lib/SPC';
import {withObservable} from '../../lib/withObservable';
import {RouterModel} from '../models/RouterModel';
import {Route} from '../routes';
import {RouterProps} from './RouterProps';

class RouterComponent extends SPC<RouterProps> {
	render() {
		const {routes, routeNames} = this.props;
		const component = routesToComponents(routes, routeNames || []);

		return component ? component : <div/>;
	}
}

export const Router = withObservable(RouterModel)(RouterComponent);

/**
 * Use the route names to look up and return the appropriate Component tree in the route configuration.
 *
 * @param nestedRoute
 * @param routeNames
 * @return Component
 */
function routesToComponents(nestedRoute?: Route, routeNames?: string[]) {
	if (nestedRoute == null || routeNames == null || routeNames.length === 0) {
		return null;
	}

	const route = nestedRoute[routeNames[0]];
	const Component = route.component;

	if (routeNames.length === 1) {
		return <Component/>;
	}

	return <Component>{routesToComponents(route.children, routeNames.slice(1))}</Component>;
}
