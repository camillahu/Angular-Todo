import {Component, computed, inject, output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService} from '../shared/data-access/todo.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {Todo} from '../shared/models/todo';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet
  ],
  template: `
    @if (todo(); as todo) {
      <h2>{{ todo.title }}</h2>
      <p>{{ todo.description }}</p>
      <button (click)="isEditing = true">Edit</button>
      @if (isEditing) {
        <form [formGroup]="todoForm"
              (ngSubmit)="editTodo(todo.id, todoForm.getRawValue())">
          <input
            type="text"
            formControlName="title"
            value="{{todo.title}}">
          <input
            type="text"
            formControlName="description"
            value="{{todo.description}}">
          <button [disabled]="!todoForm.valid"
                  type="submit"
          >Confirm Edited</button>
        </form>
      }
    } @else {
      <p>Could not find todo...</p>
    }
    <button (click)="this.router.navigate(['/home'])">Back to list</button>
  `
})

export default class DetailComponent {
  private route = inject(ActivatedRoute);
  private todoService = inject(TodoService);
  private fb = inject(FormBuilder);
  protected router = inject(Router);
  // ActivatedRoute includes an observable stream - paramMap - which contains a map of all the params in the URL
  // Then we convert the observable to signal with toSignal (experimental)
  private paramMap = toSignal(this.route.paramMap);
  isEditing: boolean = false;

  todo = computed(() =>
  this.todoService.todos()
    .find((todo) => todo.id === this.paramMap()?.get('id'))
  )

  todoForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
  })

  editTodo(id: string, updatedFields: Partial<Todo>) {
    const currentTodo = this.todo();
    if(!currentTodo) return;

    const mergedFields = {...currentTodo, ...updatedFields}

    this.todoService.editTodo(id, mergedFields)
    this.isEditing = false;
  }
}
