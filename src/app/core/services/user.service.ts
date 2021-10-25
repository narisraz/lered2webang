import {Injectable} from '@angular/core';
import User from "../interfaces/User";
import {Observable, of} from "rxjs";
import AppService from "../interfaces/AppService";
import USERS from "../mocks/users";

@Injectable({
  providedIn: 'root'
})
export class UserService implements AppService<User>{

  constructor() { }

  getAll(): Observable<User[]> {
    return of(USERS)
  }

  delete(user: User): Observable<User[]> {
    return of(USERS.filter(u => u.id != user.id))
  }

  add(user: User): Observable<User[]> {
    USERS.push(user)
    return of(USERS)
  }
}
