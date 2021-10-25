import {Component, Input, OnInit} from '@angular/core';
import {FormFieldComponent} from "../form-field/form-field.component";
import SelectData from "./SelectData";

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends FormFieldComponent implements OnInit {

  @Input()
  values: SelectData[]

  ngOnInit(): void {
  }

}
