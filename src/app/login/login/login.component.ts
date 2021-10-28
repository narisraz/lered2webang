import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input()
  isAdmin = false

  formGroup: FormGroup
  email: string
  password: string

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.signIn(this.email, this.password).then(uid => {
      if (!uid) {
        this.snackBar.open('Email ou mot de passe erroné', 'Ok', {
          panelClass: ['bg-red-600', 'text-white'],
          verticalPosition: 'top',
          duration: 10000
        })
      } else {
        this.router.navigate(['/'])
      }
    })
  }

}
