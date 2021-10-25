import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmComponent} from './confirm/confirm.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {FormComponent} from './form/form.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ConfirmComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    ConfirmComponent,
    FormComponent
  ]
})
export class DialogModule { }
