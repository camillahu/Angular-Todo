import {filter, from, map, Observable, of, tap} from 'rxjs';

//Manual creation of observable
const myObservable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.next(4);
  subscriber.next(5);
  });

const observer = {
  next: (data: any) => console.log('My next was called with', data),
  complete: () => console.log('The observable has finished emitting data'),
  error: (err: any) => console.log('The following error ocurred', err)
}
myObservable.subscribe(observer)

//Or more simply:
myObservable.subscribe((data) => console.log(data))

//With a loop:
const myObservable2 = new Observable(subscriber => {
  for(let i = 1; i <= 5; i++){
    subscriber.next(i);
  }
});

//Creation operators(more common than the manual creation above)
let myObservable3 = from([1,2,3,4,5]) //emits each number as their own value
let myObservable4 = of([1,2,3,4,5]) //emits the whole array as a single value

//Pipe methods
myObservable3.pipe(
  tap((value) => console.log('before map:', value)),
  map((value) => value * 2),
  tap((value) => console.log('after map:', value)),
  filter((value) => value < 7)
).subscribe((val) => console.log('stream emitted:', val));






