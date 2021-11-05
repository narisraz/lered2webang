import {Injectable} from '@angular/core';
import {CrudService} from "./crud.service";
import Compte from "../interfaces/Compte";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {COMPTE_COLLECTION} from "../../shared/dialog/Constants";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import EnhancedCompte from "../interfaces/EnhancedCompte";
import {PlatformService} from "./platform.service";
import SelectData from "../../shared/form/select-field/SelectData";

@Injectable({
  providedIn: 'root'
})
export class CompteService extends CrudService<Compte> {

  constructor(
    private firestore: AngularFirestore,
    private platformService: PlatformService,
  ) {
    super(firestore)
    super.collection = COMPTE_COLLECTION
  }

  getAllEnhancedCompte(): Observable<EnhancedCompte[]> {
    return combineLatest([
      this.platformService.getAll(),
      this.getAll()
    ]).pipe(
      map(([platforms, comptes]): EnhancedCompte[] => {
        return comptes.map((compte): EnhancedCompte => {
          return {
            ...compte,
            platformLabel: platforms.find(platform => platform.fsId == compte.platformId)?.name
          }
        })
      })
    )
  }

  toSelectData(): Observable<SelectData[]> {
    return super.getAll().pipe(
      map(comptes => comptes.map((compte): SelectData => {
        return {
          code: compte.fsId,
          label: compte.name
        }
      }))
    )
  }

}
