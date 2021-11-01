import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import FirestoreData from "../interfaces/FirestoreData";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  collection: string
  now = moment().local(true).format()

  constructor(
    private afFs: AngularFirestore
  ) { }

  get(fsId: string): Observable<T | undefined> {
    return this.afFs
      .collection<T>(this.collection)
      .doc(fsId)
      .valueChanges()
  }

  getAll(): Observable<T[]> {
    return this.afFs.collection<T>(this.collection).valueChanges()
  }

  delete(fsId: string): Promise<any> {
    return this.afFs.collection<T>(this.collection).doc(fsId).delete()
  }

  add<T extends FirestoreData>(value: T): Promise<any> {
    const id = this.afFs.createId()
    const data: T = {
      ...value,
      insertDate: this.now,
      fsId: id
    }
    return this.update(data)
  }

  update<T extends FirestoreData>(value: T): Promise<any> {
    return this.afFs.collection<T>(this.collection).doc(value.fsId)
      .set({
        ...value,
        updateDate: this.now
      })
  }
}
