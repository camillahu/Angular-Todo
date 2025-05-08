import {Component, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ReactivityObservableChild, ReactivitySignalChild} from './reactivity-children.components';

@Component({
  selector: 'test-reactivity-parent',
  standalone: true,
  imports: [
    ReactivitySignalChild,
    ReactivityObservableChild
  ],
  template: `
    <h2>Parent component (reactivity)</h2>
    <p>Parent component gives signal number: {{ signalNum() }}</p>
    <p>Parent component gives observable number: {{ observableNum$.value }}</p>

    <test-reactivity-signal-child [signalFromParent]="signalNum()"/>
    <test-reactivity-observable-child [observableFromParent]="observableNum$"/>

    <button (click)="increment(1)">Increment parent nums</button>
  `
})

export default class ReactivityParent{
  signalNum = signal(1)
  observableNum$ = new BehaviorSubject(1)

  increment(numToAdd:number) {
    this.signalNum.update((value) => value + numToAdd);
    this.observableNum$.next(this.observableNum$.value + numToAdd);
  }
}


