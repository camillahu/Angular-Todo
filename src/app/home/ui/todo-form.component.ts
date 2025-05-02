import {Component, inject, output} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {Todo} from '../../shared/models/todo';

@Component({
  selector: 'app-todo-form',
  template: `
    <form [formGroup]="todoForm"
          (ngSubmit)="todoSubmitted.emit(todoForm.getRawValue())"
    >
      <input type="text" formControlName="title" placeholder="title..."/>
      <input
        type="text"
        formControlName="description"
        placeholder="description..."
      />
      <button type="submit">Add todo</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
  standalone: true
})

export class TodoFormComponent {
  private fb = inject(FormBuilder);

  todoForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
  });

  todoSubmitted = output<Todo>();
}
