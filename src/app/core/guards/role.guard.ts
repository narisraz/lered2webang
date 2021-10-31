import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LOCALSTORAGE_ROLE_ID} from "../../shared/dialog/Constants";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../services/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routeRole: number = route.data.role
    const loggedUserRole: number = Number(localStorage.getItem(LOCALSTORAGE_ROLE_ID))
    return this.authService.isLoggedIn().pipe(
      map(value => {
        if (value && routeRole == loggedUserRole) {
          return true
        }
        this.router.navigate(['login'])
        return false
      })
    )
  }

}
