import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LOCALSTORAGE_ROLE_ID} from "../../shared/dialog/Constants";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routeRole: number = route.data.role
    const loggedUserRole: number = Number(localStorage.getItem(LOCALSTORAGE_ROLE_ID))
    if (routeRole == loggedUserRole) {
      return true
    }
    this.router.navigate(['login'])
    return false
  }

}
