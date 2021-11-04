import {Injectable} from '@angular/core';
import {CrudService} from "./crud.service";
import Status from "../interfaces/Status";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {STATUS_COLLECTION} from "../../shared/dialog/Constants";

@Injectable({
  providedIn: 'root'
})
export class StatusService extends CrudService<Status>{

  constructor(
    private firestore: AngularFirestore
  ) {
    super(firestore)
    super.collection = STATUS_COLLECTION
  }
}
