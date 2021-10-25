import {Component, OnInit} from '@angular/core';
import {FormFieldComponent} from "../form-field/form-field.component";

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent extends FormFieldComponent implements OnInit {

  hide = true

  ngOnInit(): void {
  }

}
