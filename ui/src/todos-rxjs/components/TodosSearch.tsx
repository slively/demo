import * as React from 'react'; // tslint:disable-line no-unused-variable
import {TodosSearchProps} from './TodosSearchProps';
import {FormEventHandler} from 'react';
import {SPC} from '../../lib/SPC';

export class TodosSearch extends SPC<TodosSearchProps> {

	render() {
		const {searchText} = this.props;

		return (
			<div>
				<label>Search <input type='text' value={searchText} onChange={this.updateSearchText}/></label>
			</div>
		);
	}

	updateSearchText: FormEventHandler<HTMLInputElement> = e => this.props.setSearchText(e.currentTarget.value);
}
