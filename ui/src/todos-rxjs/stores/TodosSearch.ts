import {Routing, RoutingStore} from '../../routing/stores/Routing';
import {RouteState} from 'rxjs-router5';
import {Observable} from 'rxjs/Observable';
import {TodoEntity} from '../entities/TodoEntity';
import {TodosList} from './TodosList';
import 'rxjs/add/operator/combineLatest';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

interface TodosSearchRouteParams {
	search: String;
}

class TodosSearchStore {
	readonly routing: RoutingStore = Routing;
	readonly todos$: BehaviorSubject<TodoEntity[]> = TodosList.todos$;

	searchText$: Observable<string> = this.routing.route$.map((toState: RouteState) => {
		const params = toState.params as TodosSearchRouteParams;

		return params.search || '';
	});

	filteredTodos$: Observable<TodoEntity[]> = Observable.combineLatest(
		this.todos$,
		this.searchText$,
		(todos, searchText) => todos.filter(todo => (searchText.length > 0) ? todo.text.includes(searchText) : true)
	);

	setSearchText = text => {
		const state = this.routing.router.getState() as RouteState;
		const updatedText = (text != null && text.length > 0) ? text : null;

		this.routing.router.navigate(state.name, {search: updatedText}, {replace: true, reload: true});
	}

	constructor(routing?: RoutingStore, todos$?: BehaviorSubject<TodoEntity[]>) {
		this.routing = routing || this.routing;
		this.todos$ = todos$ || this.todos$;
	}
}

export const TodosSearch = new TodosSearchStore();
