import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextFieldComponent} from './text-field/text-field.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {EmailFieldComponent} from './email-field/email-field.component';
import {PasswordFieldComponent} from './password-field/password-field.component';
import {FormFieldComponent} from './form-field/form-field.component';
import {MatIconModule} from "@angular/material/icon";
import {SelectFieldComponent} from './select-field/select-field.component';
import {MatSelectModule} from "@angular/material/select";
import {DateFieldComponent} from './date-field/date-field.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule} from "@angular/material-moment-adapter";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {RichedTextFieldComponent} from './riched-text-field/riched-text-field.component';
import {QuillModule} from "ngx-quill";
import {TimeFieldComponent} from './time-field/time-field.component';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";


@NgModule({
  declarations: [
    TextFieldComponent,
    EmailFieldComponent,
    PasswordFieldComponent,
    FormFieldComponent,
    SelectFieldComponent,
    DateFieldComponent,
    RichedTextFieldComponent,
    TimeFieldComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    QuillModule.forRoot(),
    FormsModule,
    NgxMaterialTimepickerModule
  ],
  exports: [
    TextFieldComponent,
    EmailFieldComponent,
    PasswordFieldComponent,
    SelectFieldComponent,
    DateFieldComponent,
    RichedTextFieldComponent,
    TimeFieldComponent
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class FormModule { }
