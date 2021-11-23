import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Task from "../../core/interfaces/Task";
import {Observable, of, Subscription} from "rxjs";
import {StatusService} from "../../core/services/status.service";
import SelectData from "../../shared/form/select-field/SelectData";
import {PlatformService} from "../../core/services/platform.service";
import {CompteService} from "../../core/services/compte.service";
import {UserService} from "../../core/services/user.service";
import {TaskService} from "../../core/services/task.service";
import Platform from "../../core/interfaces/Platform";
import User from "../../core/interfaces/User";
import Compte from "../../core/interfaces/Compte";
import Status from "../../core/interfaces/Status";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ROUTE_TYPE, ROUTE_TYPE_ADD} from "../../shared/dialog/Constants";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  title = 'Nouvelle tâche'
  routeType = ROUTE_TYPE.indexOf(ROUTE_TYPE_ADD)

  taskSubscription: Subscription

  formGroup: FormGroup
  statutesSelectData$: Observable<SelectData[]>;
  platformsSelectData$: Observable<SelectData[]>
  comptesSelectData$: Observable<SelectData[]>
  usersSelectData$: Observable<SelectData[]>

  users$: Observable<User[]>
  statutes$: Observable<Status[]>
  platforms$: Observable<Platform[]>
  comptes$: Observable<Compte[]>

  constructor(
    private formBuilder: FormBuilder,
    private statusService: StatusService,
    private platformService: PlatformService,
    private compteService: CompteService,
    private userService: UserService,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.title = data['title']
      this.routeType = data['type']
    })

    this.users$ = this.userService.getAll()
    this.statutes$ = this.statusService.getAll()
    this.platforms$ = this.platformService.getAll()
    this.comptes$ = this.compteService.getAll()

    this.statutesSelectData$ = this.statusService.toSelectData(this.statutes$)
    this.platformsSelectData$ = this.platformService.toSelectData(this.platforms$)
    this.comptesSelectData$ = this.compteService.toSelectData(of())
    this.usersSelectData$ = this.userService.toSelectData(this.users$)

    const data = {
      fsId: [],
      insertDate: [],
      updateDate: [],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      userId: [undefined, [Validators.required]],
      platformId: [undefined, [Validators.required]],
      compteId: [undefined, [Validators.required]],
      dueDate: [undefined, [Validators.required]],
      dueHour: [undefined, [Validators.required]],
      earning: [],
    }
    this.formGroup = this.formBuilder.group(data)

    this.activatedRoute.params.subscribe(params => {
      const taskId = params['taskId']
      if (!taskId)
        return
      const task$: Observable<Task | undefined> = this.taskService.get(taskId)
      this.taskSubscription = task$.subscribe(task => {
        this.updateCompte(task?.platformId ?? '')
        this.f['fsId'].setValue(task?.fsId)
        this.f['insertDate'].setValue(task?.insertDate)
        this.f['updateDate'].setValue(task?.updateDate)
        this.f['title'].setValue(task?.title)
        this.f['description'].setValue(task?.description)
        this.f['statusId'].setValue(task?.statusId)
        this.f['userId'].setValue(task?.userId)
        this.f['platformId'].setValue(task?.platformId)
        this.f['compteId'].setValue(task?.compteId)
        this.f['dueDate'].setValue(task?.dueDate)
        this.f['dueHour'].setValue(task?.dueHour)
        this.f['earning'].setValue(task?.earning)
      })
    })
  }

  get f() { return this.formGroup.controls }

  save() {
    this.formGroup.markAllAsTouched()
    if (this.formGroup.valid) {
      const value = this.formGroup.getRawValue() as Task
      const promise = this.addOrUpdate(value)
      promise.then(() => {
        this.router.navigate(['/task/list']).then(() => {
          this.snackBar.open('Enregistrement de la tâche effectué', 'Ok', {
            panelClass: ['bg-green-600', 'text-white'],
            verticalPosition: 'top',
            duration: 5000
          })
        })
      })
    }
  }

  addOrUpdate(value: Task): Promise<any> {
    if (this.routeType == ROUTE_TYPE.indexOf(ROUTE_TYPE_ADD))
      return this.taskService.add(value)
    return this.taskService.update(value)
  }

  reset() {
    this.formGroup.reset()
  }

  updateCompte(platformId: string) {
    const comptesByPlatforms$ = this.compteService.filterByPlatformId(this.comptes$, platformId)
    this.comptesSelectData$ = this.compteService.toSelectData(comptesByPlatforms$)
  }

  ngOnDestroy(): void {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe()
  }
}
