import createObservables, {RouterEvent, RouteState} from 'rxjs-router5';
import router5CreateRouter, {Router5} from 'router5';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import 'rxjs/add/observable/combineLatest';
import {Observable} from 'rxjs/Observable';

// routes are added in RouterModel.ts
const router: Router5 = router5CreateRouter(undefined, {allowNotFound: true, strictQueryParams: false})
	.usePlugin(browserPlugin())
	.usePlugin(listenersPlugin());

const {route$, transitionError$, transitionRoute$} = createObservables(router);

export interface RoutingStore {
	router: Router5;
	route$: Observable<RouteState>;
	transitionError$: Observable<RouterEvent>;
	transitionRoute$: Observable<RouterEvent>;
}

export const Routing: RoutingStore = {
	router,
	route$: route$.map(state => state == null ? router.getState() : state),
	transitionError$,
	transitionRoute$: transitionRoute$.map(event => {
		if (event == null) {
			const initialEvent: RouterEvent = {
				fromState: undefined,
				toState: router.getState() as RouteState
			};

			return initialEvent;
		}

		return event;
	})
};
