import {TodoEntity} from '../../todos-rxjs/entities/TodoEntity';
import {TodosSearchProps} from '../../todos-rxjs/components/TodosSearchProps';

export interface TodosListProps {
	todos: TodoEntity[];
	addTodo: (todo: TodoEntity) => void;
	search: TodosSearchProps;
}
