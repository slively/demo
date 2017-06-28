import {TodosList} from '../components/TodosList';
import {TodosListProps} from '../components/TodosListProps';
import {TodosListPageModel} from '../models/TodosListPageModel';
import {withObservable} from '../../lib/withObservable';

export const TodosListPage = withObservable<TodosListProps>(TodosListPageModel)(TodosList);
