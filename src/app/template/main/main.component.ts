import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import User from "../../core/interfaces/User";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loggedUser$: Observable<User>

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
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
    return this.userService.isAdmin(user)
  }

}
