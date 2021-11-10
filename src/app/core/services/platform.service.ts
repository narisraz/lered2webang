import {Injectable} from '@angular/core';
import {CrudService} from "./crud.service";
import Platform from "../interfaces/Platform";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PLATFORM_COLLECTION} from "../../shared/dialog/Constants";
import {Observable} from "rxjs";
import SelectData from "../../shared/form/select-field/SelectData";
import {map} from "rxjs/operators";

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

  toSelectData(obs: Observable<Platform[]>): Observable<SelectData[]> {
    return obs.pipe(
      map(platforms => platforms.map((platform): SelectData => {
        return {
          code: platform.fsId,
          label: platform.name
        }
      }))
    )
  }

}
