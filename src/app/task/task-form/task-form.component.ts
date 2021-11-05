import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import DialogData from "../../shared/dialog/DialogData";
import Task from "../../core/interfaces/Task";
import {Observable} from "rxjs";
import {StatusService} from "../../core/services/status.service";
import SelectData from "../../shared/form/select-field/SelectData";
import {PlatformService} from "../../core/services/platform.service";
import {CompteService} from "../../core/services/compte.service";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  formGroup: FormGroup
  statutes$: Observable<SelectData[]>;
  platforms$: Observable<SelectData[]>
  comptes$: Observable<SelectData[]>
  users$: Observable<SelectData[]>

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData<Task>,
    private statusService: StatusService,
    private platformService: PlatformService,
    private compteService: CompteService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const fields = this.dialogData.fields
    const disabledField: string[] | undefined = this.dialogData.disabledField

    this.statutes$ = this.statusService.toSelectData()
    this.platforms$ = this.platformService.toSelectData()
    this.comptes$ = this.compteService.toSelectData()
    this.users$ = this.userService.toSelectData()

    this.formGroup = this.formBuilder.group({
      fsId: [fields?.fsId],
      insertDate: [fields?.insertDate],
      updateDate: [fields?.updateDate],
      title: [fields?.title, [Validators.required]],
      description: [fields?.description, [Validators.required]],
      statusId: [fields?.statusId, [Validators.required]],
      userId: [fields?.userId, [Validators.required]],
      platformId: [fields?.platformId, [Validators.required]],
      compteId: [fields?.compteId, [Validators.required]],
    })

    disabledField?.forEach(field => this.f[field].disable())
  }

  get f() { return this.formGroup.controls }

}
