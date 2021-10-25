import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../../shared/form/MustMatch";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import DialogData from "../../../shared/dialog/DialogData";
import {UserWithCredential} from "../UserWithCredential";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userWithCredentialDialogData: DialogData<UserWithCredential>
  ) { }

  ngOnInit(): void {
    const fields = this.userWithCredentialDialogData.fields
    this.formGroup = this.formBuilder.group({
      name: [fields?.name, [Validators.required]],
      firstName: [fields?.firstName, Validators.required],
      email: [fields?.email, [Validators.required, Validators.email]],
      password: [fields?.password, Validators.required],
      confirm: [fields?.password, Validators.required]
    }, {
      validators: MustMatch('password', 'confirm')
    } as AbstractControlOptions)
  }

  get f() { return this.formGroup.controls }

}
