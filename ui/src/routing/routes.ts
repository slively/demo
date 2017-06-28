import Home from '../Home';
import NotFound from '../NotFound';
import {TodosListPage as RxJSTodosListPage} from '../todos-rxjs/containers/TodosListPage';
import {TodosListPage as RecomposeTodosListPage} from '../todos-recompose/containers/TodosListPage';

const NOT_FOUND_ROUTE: string = '@@router5/UNKNOWN_ROUTE';

export interface Route {
	[name: string]: {
		path: string;
		component: React.ComponentClass<any>; // tslint:disable-line no-any
		children?: Route;
		params?: object;
	};
}

/**
 * Configuration of routes to components
 */
export const routes: Route = {
	index: {
		path: '/',
		component: Home
	},
	home: {
		path: '/home',
		component: Home
	},
	todosRxJS: {
		path: '/todos-rxjs',
		component: RxJSTodosListPage
	},
	todosRecompose: {
		path: '/todos-recompose',
		component: RecomposeTodosListPage
	},
	[NOT_FOUND_ROUTE]: {
		path: '/oh-no',
		component: NotFound
	}
};
