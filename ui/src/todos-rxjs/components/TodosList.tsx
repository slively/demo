import * as styles from './TodosList.pcss';
import * as React from 'react'; // tslint:disable-line no-unused-variable
import {TodosListProps} from './TodosListProps';
import {FormEventHandler} from 'react';
import {TodosSearch} from './TodosSearch';

interface TodosListState {
	todoText: string;
}

export class TodosList extends React.PureComponent<TodosListProps, TodosListState> {
	state = {
		todoText: ''
	};

	render() {
		const {todos, search} = this.props;

		return (
			<div>
				<h2>Todos RxJS</h2>
				<button onClick={this.addTodo}>add</button>
				<input type='text' value={this.state.todoText} onChange={this.updateTodoText}/>
				<TodosSearch {...search}/>
				<ol className={styles.list}>
					{todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
				</ol>
			</div>
		);
	}

	componentDidMount() {
		this.props.refresh();
	}

	updateTodoText: FormEventHandler<HTMLInputElement> = e => this.setState({todoText: e.currentTarget.value});

	addTodo = () => {
		if (this.state.todoText.length) {
			this.props.addTodo({text: this.state.todoText});
			this.setState({todoText: ''});
		}
	};
}
