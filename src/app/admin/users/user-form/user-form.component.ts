import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../../shared/form/MustMatch";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import DialogData from "../../../shared/dialog/DialogData";
import {UserWithCredential} from "../UserWithCredential";
import {ROLES} from "../../../shared/dialog/Constants";
import SelectData from "../../../shared/form/select-field/SelectData";
import * as moment from "moment/moment";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  formGroup: FormGroup
  roles = ROLES.map((role, index): SelectData => {
    return {
      code: index,
      label: role
    }
  })

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData<UserWithCredential>
  ) { }

  ngOnInit(): void {
    const fields = this.dialogData.fields
    const disabledField: string[] | undefined = this.dialogData.disabledField

    this.formGroup = this.formBuilder.group({
      authId: [fields?.authId],
      fsId: [fields?.fsId],
      insertDate: [fields?.insertDate],
      updateDate: [fields?.updateDate],
      hiringDate: [fields?.hiringDate ?? moment().local().format(), [Validators.required]],
      name: [fields?.name, [Validators.required]],
      firstName: [fields?.firstName, Validators.required],
      email: [fields?.email, [Validators.required, Validators.email]],
      password: [fields?.password, [Validators.required, Validators.minLength(6)]],
      confirm: [fields?.password, Validators.required],
      role: [fields?.role, Validators.required],
    }, {
      validators: MustMatch('password', 'confirm')
    } as AbstractControlOptions)

    disabledField?.forEach(field => this.f[field].disable())
  }

  get f() { return this.formGroup.controls }

}
