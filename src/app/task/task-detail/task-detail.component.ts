import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {TaskService} from "../../core/services/task.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import SelectData from "../../shared/form/select-field/SelectData";
import {StatusService} from "../../core/services/status.service";
import Status from "../../core/interfaces/Status";
import EnhancedTask from "../../core/interfaces/EnhancedTask";
import User from "../../core/interfaces/User";
import {UserService} from "../../core/services/user.service";
import {AuthService} from "../../core/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  formGroup: FormGroup
  isAdmin = false
  enhancedTask?: EnhancedTask

  task$: Observable<EnhancedTask | undefined>
  statutes$: Observable<Status[]>
  users$: Observable<User[]>
  statutesSelectData$: Observable<SelectData[]>;
  usersSelectData$: Observable<SelectData[]>

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private statusService: StatusService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.authService.loggedUser.subscribe(user => {
      this.isAdmin = this.userService.isAdmin(user)
    })
    this.activatedRoute.params.subscribe(params => {
      const taskId = params['taskId']
      this.task$ = this.taskService.getEnhancedTask(taskId)

      this.statutes$ = this.statusService.getAll()
      this.users$ = this.userService.getAll()

      this.statutesSelectData$ = this.statusService.toSelectData(this.statutes$)
      this.usersSelectData$ = this.userService.toSelectData(this.users$)

      const data = {
        statusId: ['', [Validators.required]],
        userId: [undefined, [Validators.required]],
      }
      this.formGroup = this.formBuilder.group(data)

      this.task$.subscribe(task => {
        this.enhancedTask = task
        this.f['statusId'].setValue(task?.statusId)
        this.f['userId'].setValue(task?.userId)
      })
    })
  }

  get f() { return this.formGroup.controls }

  changeStatus(statusId: string) {
    this.taskService.updateStatus(this.enhancedTask?.fsId ?? '', statusId).then(() => {
      this.snackBar.open('Statut mis à jour avec succès', 'Ok', {
        panelClass: ['bg-green-600', 'text-white'],
        verticalPosition: 'top',
        duration: 3000
      })
    })
  }
}
