interface Observer {
  next: (value: any) => void
  error: (err: any) => void
  complete: () => void
}

class Observable {
  constructor(private _subscribe: (observer: Observer) => void) {}

  subscribe(observer: Observer) {
    this._subscribe(observer)
  }
}

const emitOneToFive = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.next(5);
})
