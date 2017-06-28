package com.demo.todos

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import javax.persistence.*

@Repository
interface TodosRepository : JpaRepository<TodoPersistenceModel, Long>

@Entity
@Table(name = "todos")
data class TodoPersistenceModel(
	@Id
	@GeneratedValue(generator = "todo_id_seq")
	@SequenceGenerator(name = "todo_id_seq", sequenceName = "todo_id_seq")
	val id: Long? = null,

	@Column(name = "text", nullable = false)
	val text: String = ""
) {
	fun toServiceModel(): TodoServiceModel {
		return TodoServiceModel(id = id, text = text)
	}

	companion object {
		fun fromServiceModel(serviceModel: TodoServiceModel): TodoPersistenceModel {
			return TodoPersistenceModel(id = serviceModel.id, text = serviceModel.text)
		}
	}
}
