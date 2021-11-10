import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CrudService} from "./crud.service";
import {Observable} from "rxjs";
import User from "../interfaces/User";
import {ADMIN, ROLES, USER_COLLECTION} from "../../shared/dialog/Constants";
import {map} from "rxjs/operators";
import SelectData from "../../shared/form/select-field/SelectData";


@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {

  constructor(
    private firestore: AngularFirestore
  ) {
    super(firestore)
    super.collection = USER_COLLECTION
  }

  findByAuthId(authId: string): Observable<User> {
    return this.firestore
      .collection<User>(USER_COLLECTION, ref => ref.where('authId', '==', authId))
      .valueChanges()
      .pipe(
        map(users => users[0])
      )
  }

  findByEmail(email: string): Observable<User[]> {
    return this.firestore
      .collection<User>(USER_COLLECTION, ref => ref.where('email', '==', email))
      .valueChanges()
  }

  isAdmin(user: User): boolean {
    return user.role == ROLES.indexOf(ADMIN)
  }

  toSelectData(obs: Observable<User[]>): Observable<SelectData[]> {
    return obs.pipe(
      map(users => users.map((user): SelectData => {
        return {
          code: user.fsId,
          label: user.firstName
        }
      }))
    )
  }
}
