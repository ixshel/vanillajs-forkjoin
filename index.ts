import { of, Observable, from, forkJoin, concat } from 'rxjs';
import { map, catchError, tap, switchMap, defaultIfEmpty } from 'rxjs/operators';


const url = 'https://jsonplaceholder.typicode.com';

class TodoService {
  getTodo(x: number) {
    return from(fetch(`${url}/todos/${x}`)).pipe(
      switchMap(response => from(response.json()))
    );
  }
}

const api = new TodoService();
const todo1$ = api.getTodo(1);
const todo201$ = api.getTodo(201).pipe(
  catchError(err => of({ isError: true, error: err }))
);
const todo2$ = api.getTodo(43);


// forkJoin([todo1$, todo201$, todo2$])
// .subscribe(
//   next => console.log('next: ', next),
//   error => console.log('error: ', error)
// );

let resHtml = document.getElementById('result');

forkJoin([todo1$, todo201$, todo2$])
  
  .pipe(
    defaultIfEmpty(null)
  )
  .subscribe(res =>
    resHtml.innerHTML = JSON.stringify(res));