import {Component, Input, OnInit} from '@angular/core';
import {FORM_ERRORS} from "../../dialog/Constants";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  errors = FORM_ERRORS

  @Input()
  name: string

  @Input()
  label: string

  @Input()
  formGroup: FormGroup

  @Input()
  required: boolean

  constructor() { }

  ngOnInit(): void {
  }

  get f() { return this.formGroup.controls }

}
