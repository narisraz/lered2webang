import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import DialogData from "../../../shared/dialog/DialogData";
import Status from "../../../core/interfaces/Status";
import {ROLES} from "../../../shared/dialog/Constants";
import SelectData from "../../../shared/form/select-field/SelectData";

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent implements OnInit {

  roles = ROLES.map((role, index): SelectData => {
    return {
      code: index,
      label: role
    }
  })
  formGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData<Status>
  ) { }

  ngOnInit(): void {
    const fields = this.dialogData.fields
    const disabledField: string[] | undefined = this.dialogData.disabledField

    this.formGroup = this.formBuilder.group({
      fsId: [fields?.fsId],
      insertDate: [fields?.insertDate],
      updateDate: [fields?.updateDate],
      label: [fields?.label, [Validators.required]],
      userRole: [fields?.userRole, [Validators.required]],
    })

    disabledField?.forEach(field => this.f[field].disable())
  }

  get f() { return this.formGroup.controls }

}
