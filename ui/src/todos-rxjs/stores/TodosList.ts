import {TodoEntity} from '../entities/TodoEntity';
import {TodosService} from '../TodosService';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

class TodosListStore {
	readonly todos$: BehaviorSubject<TodoEntity[]> = new BehaviorSubject<TodoEntity[]>([]);

	refresh = () => TodosService.find().then((todos: TodoEntity[]) => this.todos$.next(todos));

	addTodo = (todo: TodoEntity) => TodosService.create(todo).then((addedTodo: TodoEntity) => this.todos$.next(this.todos$.value.concat(addedTodo)));

	constructor(todos$?: BehaviorSubject<TodoEntity[]>) {
		this.todos$ = todos$ || this.todos$;
	}
}

export const TodosList = new TodosListStore();
