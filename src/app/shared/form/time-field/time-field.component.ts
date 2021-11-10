import { Component, OnInit } from '@angular/core';
import {FormFieldComponent} from "../form-field/form-field.component";

@Component({
  selector: 'app-time-field',
  templateUrl: './time-field.component.html',
  styleUrls: ['./time-field.component.scss']
})
export class TimeFieldComponent extends FormFieldComponent implements OnInit {

  ngOnInit(): void {
  }

}
