import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import DialogData from "../DialogData";
import {CANCEL, CONFIRM} from "../Constants";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  confirm = CONFIRM
  cancel = CANCEL

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData<any>
  ) { }

  ngOnInit(): void {
  }

}
