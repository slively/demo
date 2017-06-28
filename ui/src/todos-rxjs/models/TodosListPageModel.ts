import {TodosListProps} from '../components/TodosListProps';
import combineLatestObj from '../../lib/combineLatestObj';
import {TodosList} from '../stores/TodosList';
import {TodosSearch} from '../stores/TodosSearch';
import {TodosSearchProps} from '../components/TodosSearchProps';

export const TodosListPageModel = combineLatestObj<TodosListProps>({
	todos: TodosSearch.filteredTodos$,
	refresh: TodosList.refresh,
	addTodo: TodosList.addTodo,
	search: combineLatestObj<TodosSearchProps>({
		searchText: TodosSearch.searchText$,
		setSearchText: TodosSearch.setSearchText
	})
});
