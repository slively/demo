import {compose, mapProps, withState} from 'recompose';
import {withObservable} from '../../lib/withObservable';
import {TodosList} from '../components/TodosList';
import {TodosListProps} from '../components/TodosListProps';
import {withPromise} from '../../lib/withPromise';
import {TodosService} from '../../todos-rxjs/TodosService';
import {Routing} from '../../routing/stores/Routing';
import {TodoEntity} from '../../todos-rxjs/entities/TodoEntity';
import {RouteState} from 'rxjs-router5';
import {createSelector} from 'reselect';
import {TodosSearchProps} from '../../todos-rxjs/components/TodosSearchProps';

interface TodosFindResponse {
	promiseData?: TodoEntity[];
	promiseError?: object;
	loaded: boolean;
}

interface UrlState {
	searchText: string;
}

interface AddedTodosState {
	addedTodos: TodoEntity[];
	addTodoToState: (todo: TodoEntity) => void;
}

type TodosListDataProps = TodosFindResponse & UrlState & AddedTodosState;

const selectFilteredTodos = createSelector<TodosListDataProps, TodoEntity[], string, TodoEntity[], TodoEntity[]>(
	props => props.promiseData || [],
	props => props.searchText || '',
	props => props.addedTodos,
	(todos, searchText, addedTodos) => ((searchText.length > 0) ? todos.filter(todo => todo.text.includes(searchText)) : todos).concat(addedTodos)
);

const selectSearchProps = (props: TodosListDataProps): TodosSearchProps => ({
	searchText: props.searchText,
	setSearchText: searchText => {
		const state = Routing.router.getState() as RouteState;

		Routing.router.navigate(state.name, {searchText}, {replace: true, reload: true});
	}
});

export const TodosListPage = compose<TodosListProps, {}>(
	withPromise<TodoEntity[]>(() => TodosService.find()),
	withState<AddedTodosState>('addedTodos', 'addTodoToState', []),
	withObservable<UrlState>(Routing.route$.map((state: RouteState) => state.params as UrlState)),
	mapProps<TodosListProps, TodosListDataProps>(
		props => ({
			addTodo: (todo: TodoEntity) => TodosService.create(todo).then(addedTodo => props.addTodoToState(addedTodo)),
			todos: selectFilteredTodos(props),
			search: selectSearchProps(props)
		})
	)
)(TodosList);
