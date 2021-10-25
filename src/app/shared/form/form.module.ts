import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextFieldComponent} from './text-field/text-field.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {EmailFieldComponent} from './email-field/email-field.component';
import {PasswordFieldComponent} from './password-field/password-field.component';
import {FormFieldComponent} from './form-field/form-field.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    TextFieldComponent,
    EmailFieldComponent,
    PasswordFieldComponent,
    FormFieldComponent
  ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule
    ],
  exports: [
    TextFieldComponent,
    EmailFieldComponent,
    PasswordFieldComponent
  ]
})
export class FormModule { }
