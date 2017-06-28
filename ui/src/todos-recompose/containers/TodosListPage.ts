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
	setAddedTodos: (addedTodos: TodoEntity[]) => void;
}

type TodosListDataProps = TodosFindResponse & UrlState & AddedTodosState;

const selectSearchText = props => props.searchText || '';
const selectFilteredTodos = createSelector<TodosListDataProps, TodoEntity[], string, TodoEntity[], TodoEntity[]>(
	props => props.promiseData || [],
	selectSearchText,
	props => props.addedTodos,
	(todos, searchText, addedTodos) => ((searchText.length > 0) ? todos.filter(todo => todo.text.includes(searchText)) : todos).concat(addedTodos)
);

const selectSearchProps = (props: TodosListDataProps): TodosSearchProps => ({
	searchText: selectSearchText(props),
	setSearchText: searchText => {
		const state = Routing.router.getState() as RouteState;

		Routing.router.navigate(state.name, {searchText: searchText.length ? searchText : undefined}, {replace: true, reload: true});
	}
});

export const TodosListPage = compose<TodosListProps, {}>(
	withPromise<TodoEntity[]>(() => TodosService.find()),
	withState<AddedTodosState>('addedTodos', 'setAddedTodos', []),
	withObservable<UrlState>(Routing.route$.map((state: RouteState) => state.params as UrlState)),
	mapProps<TodosListProps, TodosListDataProps>(
		props => ({
			addTodo: (todo: TodoEntity) => TodosService.create(todo).then((addedTodo: TodoEntity) => props.setAddedTodos(props.addedTodos.concat(addedTodo))),
			todos: selectFilteredTodos(props),
			search: selectSearchProps(props)
		})
	)
)(TodosList);
