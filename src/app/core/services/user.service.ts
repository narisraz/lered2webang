import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CrudService} from "./crud.service";
import {Observable} from "rxjs";
import User from "../interfaces/User";
import {USER_COLLECTION} from "../../shared/dialog/Constants";


@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService{

  constructor(
    private firestore: AngularFirestore
  ) {
    super(firestore)
    super.collection = USER_COLLECTION
  }

  findByAuthId(authId: string): Observable<User[]> {
    return this.firestore
      .collection<User>(USER_COLLECTION, ref => ref.where('authId', '==', authId))
      .valueChanges()
  }

  findByEmail(email: string): Observable<User[]> {
    return this.firestore
      .collection<User>(USER_COLLECTION, ref => ref.where('email', '==', email))
      .valueChanges()
  }
}
