import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import DialogData from "../../dialog/DialogData";
import Comment from "../../../core/interfaces/Comment";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData<Comment>
  ) { }

  ngOnInit(): void {
    const fields = this.dialogData.fields
    this.formGroup = this.formBuilder.group({
      fsId: [fields?.fsId],
      insertDate: [fields?.insertDate],
      updateDate: [fields?.updateDate],
      userId: [fields?.userId],
      value: [fields?.value],
    })
  }

  get f() { return this.formGroup.controls }

}
