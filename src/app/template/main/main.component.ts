import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import User from "../../core/interfaces/User";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loggedUser$: Observable<User>

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedUser$ = this.authService.loggedUser
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['login'])
    })
  }

  isAdmin(user: User) {
    return this.authService.isAdmin(user)
  }

}
