import {Component} from '@angular/core';
import {TodoFormComponent} from './ui/todo-form.component';

@Component(
  {
    selector: 'app-home',
    standalone: true,
    imports: [
      TodoFormComponent
    ],
    template: `
      <h2>Todo</h2>
      <app-todo-form/>
    `
  }
)

export default class HomeComponent {

}
