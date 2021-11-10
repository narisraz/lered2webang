import {Component, Input, OnInit} from '@angular/core';
import {FormFieldComponent} from "../form-field/form-field.component";

@Component({
  selector: 'app-riched-text-field',
  templateUrl: './riched-text-field.component.html',
  styleUrls: ['./riched-text-field.component.scss']
})
export class RichedTextFieldComponent extends FormFieldComponent implements OnInit {

  @Input() placeholder = ""

  quillConfig={
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link'],
        //['link', 'image', 'video']
      ],

    },
  }

  ngOnInit(): void {
  }

}
