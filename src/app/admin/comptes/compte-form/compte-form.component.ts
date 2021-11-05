import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import DialogData from "../../../shared/dialog/DialogData";
import Compte from "../../../core/interfaces/Compte";
import SelectData from "../../../shared/form/select-field/SelectData";
import {PlatformService} from "../../../core/services/platform.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-compte-form',
  templateUrl: './compte-form.component.html',
  styleUrls: ['./compte-form.component.scss']
})
export class CompteFormComponent implements OnInit {

  formGroup: FormGroup
  platforms: Observable<SelectData[]>

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData<Compte>,
    private platformService: PlatformService
  ) { }

  ngOnInit(): void {
    const fields = this.dialogData.fields
    const disabledField: string[] | undefined = this.dialogData.disabledField
    this.platforms = this.platformService.toSelectData()

    this.formGroup = this.formBuilder.group({
      fsId: [fields?.fsId],
      insertDate: [fields?.insertDate],
      updateDate: [fields?.updateDate],
      name: [fields?.name, [Validators.required]],
      firstName: [fields?.firstName, [Validators.required]],
      platformId: [fields?.platformId, [Validators.required]],
    })

    disabledField?.forEach(field => this.f[field].disable())
  }

  get f() { return this.formGroup.controls }

}
