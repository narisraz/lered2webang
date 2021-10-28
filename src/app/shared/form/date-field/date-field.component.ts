import {Component, OnInit} from '@angular/core';
import {FormFieldComponent} from "../form-field/form-field.component";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {AbstractControl} from "@angular/forms";
import * as moment from "moment";
import {Moment} from "moment";


@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
})
export class DateFieldComponent extends FormFieldComponent implements OnInit {

  ngOnInit(): void {
  }

  onDateChange(event: MatDatepickerInputEvent<Moment>, control: AbstractControl) {
    control.setValue(event.value?.format())
  }

  timestampToMoment(value: string) {
    return moment(value)
  }
}
