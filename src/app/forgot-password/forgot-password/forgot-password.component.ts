import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment/moment";
import {AuthService} from "../../core/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const email = params['email']
      this.formGroup = this.formBuilder.group({
        email: [email, [Validators.required, Validators.email]],
      })
    })
  }

  recover() {
    this.formGroup.markAllAsTouched()
    if (this.formGroup.valid) {
      const email = this.f['email'].value
      this.authService.recoverPassword(email).then(() => {
        this.router.navigate(['/login']).then(() => {
          this.snackBar.open('Un lien a été envoyé à votre adresse email', 'Ok', {
            panelClass: ['bg-green-600', 'text-white'],
            verticalPosition: 'top',
            duration: 10000
          })
        })
      })
    }
  }

  get f() { return this.formGroup.controls }

}
