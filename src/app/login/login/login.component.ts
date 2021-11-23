import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    const data = {
      email: [],
      password: [],
    }
    this.formGroup = this.formBuilder.group(data)
  }

  login() {
    const email = this.f['email'].value
    const password = this.f['password'].value
    this.authService.signIn(email, password).then(uid => {
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

  get f() { return this.formGroup.controls }

  forgotPassword() {
    const email = this.f['email'].value
    this.router.navigate(['/forgot-password'], {
      queryParams: {
        email: email
      }
    })
  }
}
