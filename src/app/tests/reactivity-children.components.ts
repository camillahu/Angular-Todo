import {Component, computed, Input, input, InputSignal} from '@angular/core';
import {BehaviorSubject, map, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'test-reactivity-signal-child',
  standalone: true,
  template: `
    <h4>Child signal component (reactivity):</h4>
    <p>Child component doubles signal number: {{doubleSignal()}}</p>
  `
})

export class ReactivitySignalChild{
  signalFromParent: InputSignal<number> = input.required();
  doubleSignal = computed(() => this.signalFromParent() * 2)
}

@Component({
  selector: 'test-reactivity-observable-child',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  template: `
    <h4>Child observable component (reactivity):</h4>
    <p>Child component doubles observable number: {{ doubleObservable()  | async }}</p>
  `
})

export class ReactivityObservableChild{
  @Input() observableFromParent!: BehaviorSubject<number>

  doubleObservable() {
    return this.observableFromParent.pipe(
      map((value) => value * 2)
    );
  }
}
