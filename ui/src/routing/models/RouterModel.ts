import {Routing} from '../stores/Routing';
import {RouterProps} from '../containers/RouterProps';
import {RouteState} from 'rxjs-router5';
import {Route, routes} from '../routes';
import 'rxjs/add/operator/map';
import combineLatestObj from '../../lib/combineLatestObj';

interface FlatRoute {
	name: string;
	path: string;
	children?: FlatRoute[];
}

function nestedRouteToFlatRoutes(nested?: Route): FlatRoute[] {
	if (nested == null) {
		return [];
	}

	return Object.keys(nested).reduce(
		(flatRoutes: FlatRoute[], name: string) => {
			const route = nested[name];
			const children = nestedRouteToFlatRoutes(route.children);

			flatRoutes.push({name, path: route.path, children});

			return flatRoutes;
		},
		[]
	);
}

/**
 * Convert configuration to Router5 configuration, add routes to router, and start the router
 */
Routing.router.add(nestedRouteToFlatRoutes(routes)).start();

export const RouterModel = combineLatestObj<RouterProps>({
	routes,
	routeNames: Routing.route$.map((routeState: RouteState) => {
		// on page load the event is null so we use the initial router state
		const toState: RouteState = routeState == null ? Routing.router.getState() as RouteState : routeState;
		const routeName = toState && toState.name as string;

		// route names are dot delimited for a given route
		return routeName ? routeName.split('.') : undefined;
	})
});
