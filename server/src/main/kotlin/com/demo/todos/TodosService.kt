package com.demo.todos

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

data class TodoServiceModel(
	val id: Long?,
	val text: String
)

@Service
class TodosService @Autowired constructor(val repository: TodosRepository) {
	fun find(): List<TodoServiceModel> {
		return repository.findAll().map { it.toServiceModel() }
	}

	fun findById(id: Long): TodoServiceModel? {
		return repository.getOne(id).toServiceModel()
	}

	fun update(todo: TodoServiceModel): TodoServiceModel {
		return repository
			.save(TodoPersistenceModel.fromServiceModel(todo))
			.toServiceModel()
	}

	fun create(todo: TodoServiceModel): TodoServiceModel {
		return update(todo)
	}

	fun delete(id: Long) {
		repository.deleteById(id)
	}
}
