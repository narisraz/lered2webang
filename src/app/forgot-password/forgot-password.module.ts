import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {MatCardModule} from "@angular/material/card";
import {TemplateModule} from "../template/template.module";
import {SharedModule} from "../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    MatCardModule,
    TemplateModule,
    SharedModule,
    MatButtonModule
  ]
})
export class ForgotPasswordModule { }
