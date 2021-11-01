import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import DialogData from "../../../shared/dialog/DialogData";
import {UserWithCredential} from "../../UserWithCredential";
import Platform from "../../../core/interfaces/Platform";
import * as moment from "moment/moment";
import {MustMatch} from "../../../shared/form/MustMatch";

@Component({
  selector: 'app-platform-form',
  templateUrl: './platform-form.component.html',
  styleUrls: ['./platform-form.component.scss']
})
export class PlatformFormComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData<Platform>
  ) { }

  ngOnInit(): void {
    const fields = this.dialogData.fields
    const disabledField: string[] | undefined = this.dialogData.disabledField

    this.formGroup = this.formBuilder.group({
      fsId: [fields?.fsId],
      insertDate: [fields?.insertDate],
      updateDate: [fields?.updateDate],
      name: [fields?.name, [Validators.required]],
      url: [fields?.url, [Validators.required]],
    })

    disabledField?.forEach(field => this.f[field].disable())
  }

  get f() { return this.formGroup.controls }

}
