import {Injectable} from '@angular/core';
import {CrudService} from "./crud.service";
import Platform from "../interfaces/Platform";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PLATFORM_COLLECTION} from "../../shared/dialog/Constants";

@Injectable({
  providedIn: 'root'
})
export class PlatformService extends CrudService<Platform> {

  constructor(
    private firestore: AngularFirestore
  ) {
    super(firestore)
    super.collection = PLATFORM_COLLECTION
  }

}
