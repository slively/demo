import axios from 'axios';

export class CrudService<T> {
	baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	find(params?: object): Promise<T[]> {
		return new Promise<T[]>((resolve, reject) => {
			axios.get(this.baseUrl, {params})
				.then(response => resolve(response.data))
				.catch(err => reject(err));
		});
	}

	findById(id: number | string): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			axios.get(`${this.baseUrl}/${id}`)
				.then(response => resolve(response.data))
				.catch(err => reject(err));
		});
	}

	create(model: T): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			axios.post(this.baseUrl, model)
				.then(response => resolve(response.data))
				.catch(err => reject(err));
		});
	}

	replace(id: number | string, model: T): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			axios.put(`${this.baseUrl}/${id}`)
				.then(response => resolve(response.data))
				.catch(err => reject(err));
		});
	}

	update(id: number | string, model: T): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			axios.patch(`${this.baseUrl}/${id}`)
				.then(response => resolve(response.data))
				.catch(err => reject(err));
		});
	}

	'delete'(id: number | string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			axios.delete(`${this.baseUrl}/${id}`)
				.then(() => resolve())
				.catch(err => reject(err));
		});
	}
}
