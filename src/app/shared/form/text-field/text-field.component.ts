import {Component, OnInit} from '@angular/core';
import {FormFieldComponent} from "../form-field/form-field.component";

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent extends FormFieldComponent implements OnInit {

  ngOnInit(): void {
  }

}
