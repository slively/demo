import {CrudService} from '../lib/CrudService';
import {TodoEntity} from './entities/TodoEntity';

export const TodosService: CrudService<TodoEntity> = new CrudService<TodoEntity>('/api/todos');
