import {compose, mapProps, withHandlers, withState} from 'recompose';
import {withObservable} from '../../lib/withObservable';
import {TodosList} from '../components/TodosList';
import {TodosListProps} from '../components/TodosListProps';
import {withPromise} from '../../lib/withPromise';
import {TodosService} from '../../todos-rxjs/TodosService';
import {Routing} from '../../routing/stores/Routing';
import {TodoEntity} from '../../todos-rxjs/entities/TodoEntity';
import {RouteState} from 'rxjs-router5';
import {createSelector, createStructuredSelector} from 'reselect';
import {TodosSearchProps} from '../../todos-rxjs/components/TodosSearchProps';

interface TodosFindResponse {
	promiseData?: TodoEntity[];
	promiseError?: object;
	loaded: boolean;
}

interface UrlState {
	searchText: string;
}

interface Handlers {
	addTodo: (props: any) => (todo: TodoEntity) => void;
	setSearchText: (props: any) => (text: string) => void;
}

interface AddedTodosState {
	addedTodos: TodoEntity[];
	addTodoToState: (props: any) => (todo: TodoEntity) => void;
}

type TodosListDataProps = TodosFindResponse & UrlState & Handlers & AddedTodosState;

const selectFilteredTodos = createSelector<TodosListDataProps, TodoEntity[], string, TodoEntity[], TodoEntity[]>(
	props => props.promiseData || [],
	props => props.searchText || '',
	props => props.addedTodos,
	(todos, searchText, addedTodos) => ((searchText.length > 0) ? todos.filter(todo => todo.text.includes(searchText)) : todos).concat(addedTodos)
);

const selectSearchProps = createStructuredSelector<TodosListDataProps, TodosSearchProps>({
	searchText: props => props.searchText,
	setSearchText: props => props.setSearchText
});

export const TodosListPage = compose<TodosListProps, {}>(
	withPromise<TodoEntity[]>(() => TodosService.find()),
	withObservable<UrlState>(Routing.route$.map((state: RouteState) => state.params as UrlState)),
	withState<AddedTodosState>('addedTodos', 'addTodoToState', []),
	withHandlers<Handlers, AddedTodosState>({
		addTodo: props => (todo: TodoEntity) => TodosService.create(todo).then(addedTodo => props.addTodoToState(addedTodo)),
		setSearchText: props => searchText => {
			const state = Routing.router.getState() as RouteState;

			Routing.router.navigate(state.name, {searchText}, {replace: true, reload: true});
		}
	}),
	mapProps<TodosListProps, TodosListDataProps>(
		props => ({
			addTodo: props.addTodo,
			todos: selectFilteredTodos(props),
			search: selectSearchProps(props)
		})
	)
)(TodosList);
