import {TodoEntity} from '../entities/TodoEntity';
import {TodosSearchProps} from './TodosSearchProps';

export interface TodosListProps {
	todos: TodoEntity[];
	refresh: () => void;
	addTodo: (todo: TodoEntity) => void;
	search: TodosSearchProps;
}
