import {Injectable, signal} from '@angular/core';
import {CreateTodo, Todo} from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // # makes it private:
  #todos = signal<Todo[]>([]);
  // readonly makes it possible to send while still private!
  todos = this.#todos.asReadonly();

  addTodo(todo: CreateTodo) {
    this.#todos.update((todos) => [
      ...todos,
      {...todo, id: Date.now().toString()}]);
  }

  removeTodo(todoId: string) {
    this.#todos.update((todos) =>
      todos.filter((todo) => todo.id !== todoId)
    )
  }

  //Partial type allows us to send only the fields we want to update
  editTodo(todoId: string, updatedFields: Todo) {
    this.#todos.update((todos) =>
      todos.map((todo) =>
      todo.id === todoId ? { ...todo, ...updatedFields } : todo)
    )
  }
}
