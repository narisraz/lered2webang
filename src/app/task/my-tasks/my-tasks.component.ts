import {Component, OnInit, ViewChild} from '@angular/core';
import {StatusService} from "../../core/services/status.service";
import {Observable} from "rxjs";
import Status from "../../core/interfaces/Status";
import EnhancedTask from "../../core/interfaces/EnhancedTask";
import {TaskService} from "../../core/services/task.service";
import {map} from "rxjs/operators";
import Column from "../../shared/table/Column";
import {TableComponent} from "../../shared/table/table.component";
import User from "../../core/interfaces/User";
import {AuthService} from "../../core/services/auth.service";
import {UserService} from "../../core/services/user.service";
import {CANCEL} from "../../shared/dialog/Constants";
import {MatDialog} from "@angular/material/dialog";
import {TaskFormComponent} from "../task-form/task-form.component";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

  loggedUser$: Observable<User>
  searchInput: string
  statutes$: Observable<Status[]>
  enhancedTask$: Observable<EnhancedTask[]>
  adminTableColumns: Column[] = [
    { name: 'platformName', label: 'Plateforme' },
    { name: 'compteName', label: 'Compte' },
    { name: 'title', label: 'Titre' },
    { name: 'description', label: 'Description' },
    { name: 'status', label: 'Statut' },
    { name: 'actions', label: 'Actions' },
  ]
  userTableColumns: Column[] = [
    { name: 'title', label: 'Titre' },
    { name: 'description', label: 'Description' },
    { name: 'status', label: 'Statut' },
    { name: 'actions', label: 'Actions' },
  ]
  tableColumns: Column[]

  @ViewChild('table')
  table: TableComponent

  constructor(
    private taskService: TaskService,
    private statusService: StatusService,
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loggedUser$ = this.authService.loggedUser
    this.enhancedTask$ = this.taskService.getAllEnhancedTasks()
    this.statutes$ = this.statusService.getStatutesPerUserRole(this.loggedUser$)
    this.loggedUser$.subscribe(user => {
      if (this.userService.isAdmin(user))
        this.tableColumns = this.adminTableColumns
      else
        this.tableColumns = this.userTableColumns
      }
    )
  }

  tasksByStatus(statusFsId: string) {
    return this.enhancedTask$.pipe(
      map(tasks => tasks.filter(task => task.statusId == statusFsId))
    )
  }

  addTask() {
    const ref = this.dialog.open(TaskFormComponent, {
      minWidth: 1000,
      disableClose: true,
      data: {
        title: 'Nouvelle tâche'
      },
    })
    ref.afterClosed().subscribe(result => {
      if (CANCEL != result) {
        this.taskService.add(result)
      }
    })
  }

  editTask(enhancedTask: EnhancedTask) {

  }

  deleteTask(enhancedTask: EnhancedTask) {

  }
}
