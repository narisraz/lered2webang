import {Component, OnInit} from '@angular/core';
import {FormFieldComponent} from "../form-field/form-field.component";

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss']
})
export class EmailFieldComponent extends FormFieldComponent implements OnInit {

  ngOnInit(): void {
  }

}
