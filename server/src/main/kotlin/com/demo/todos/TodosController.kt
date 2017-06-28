package com.demo.todos

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/todos")
class TodosController @Autowired constructor(val service: TodosService) {

	@RequestMapping(method = arrayOf(RequestMethod.GET))
	fun find(): ResponseEntity<List<TodoServiceModel>> {
		return ResponseEntity.ok(service.find())
	}

	@RequestMapping(path = arrayOf("/{id}"), method = arrayOf(RequestMethod.GET))
	fun findById(@PathVariable id: Long): ResponseEntity<TodoServiceModel> {
		val model = service.findById(id)

		return if (model != null) ResponseEntity.ok(model) else ResponseEntity.notFound().build()
	}

	@RequestMapping(method = arrayOf(RequestMethod.PUT))
	fun update(@RequestBody @Validated todo: TodoServiceModel): ResponseEntity<TodoServiceModel> {
		return ResponseEntity.ok(service.update(todo))
	}

	@RequestMapping(method = arrayOf(RequestMethod.POST))
	fun create(@RequestBody @Validated todo: TodoServiceModel): ResponseEntity<TodoServiceModel> {
		return ResponseEntity.ok(service.create(todo))
	}

	@RequestMapping(path = arrayOf("/{id}"), method = arrayOf(RequestMethod.DELETE))
	fun delete(@PathVariable id: Long): ResponseEntity<*> {
		return ResponseEntity.ok(service.delete(id))
	}
}
