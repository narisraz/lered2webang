import {Observable} from "rxjs";

interface AppService<T> {
  getAll(): Observable<T[]>
  delete(t: T): Observable<T[]>
}

export default AppService
