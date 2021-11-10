import {Injectable} from '@angular/core';
import {CrudService} from "./crud.service";
import Status from "../interfaces/Status";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ADMIN, ROLES, STATUS_COLLECTION} from "../../shared/dialog/Constants";
import {combineLatest, Observable} from "rxjs";
import User from "../interfaces/User";
import {map} from "rxjs/operators";
import {UserService} from "./user.service";
import SelectData from "../../shared/form/select-field/SelectData";

@Injectable({
  providedIn: 'root'
})
export class StatusService extends CrudService<Status>{

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {
    super(firestore)
    super.collection = STATUS_COLLECTION
  }

  getStatutesPerUserRole(user$: Observable<User>): Observable<Status[]> {
    return combineLatest([
      user$,
      super.getAll()
    ]).pipe(
      map(([user, statutes]): Status[] => {
        const isAdmin = this.userService.isAdmin(user)
        if (!isAdmin)
          return statutes.filter(status => status.userRole != ROLES.indexOf(ADMIN))
        return statutes
      }),
      map(statutes => statutes.sort((a, b) => a.userRole - b.userRole)),
    )
  }

  toSelectData(obs: Observable<Status[]>): Observable<SelectData[]> {
    return obs.pipe(
      map(statutes => statutes.map((statute): SelectData => {
        return {
          code: statute.fsId,
          label: statute.label
        }
      }))
    )
  }
}
