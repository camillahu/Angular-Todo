import {Component, input, output} from '@angular/core';
import {Todo} from '../../shared/models/todo';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  styles: [
    `
      ul {
        margin: 0;
        padding: 1rem;
      }
    `,
  ],
  template: `
    <ul>
      @for (todo of todos(); track todo.id) {
        <li>
          <a routerLink="/detail/{{ todo.id }}">{{ todo.title }}</a>
          <button (click)="completedTodoId.emit(todo.id)">Completed</button>
        </li>
      } @empty {
        <li>Nothing to do!</li>
      }
    </ul>
  `
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
  completedTodoId = output<string>();
}
