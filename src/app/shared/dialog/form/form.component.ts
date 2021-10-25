import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import DialogData from "../DialogData";
import {FormGroup} from "@angular/forms";
import {CANCEL} from "../Constants";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  cancel = CANCEL

  @Input()
  formGroup: FormGroup

  constructor(
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<any>,
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.formGroup.markAllAsTouched()
    if (this.formGroup.valid) {
      const value = this.formGroup.getRawValue()
      this.dialogRef.close(value)
    }
  }

  reset() {
    this.formGroup.reset()
  }

}
