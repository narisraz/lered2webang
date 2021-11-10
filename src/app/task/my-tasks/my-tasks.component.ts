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
import {CONFIRM} from "../../shared/dialog/Constants";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ConfirmComponent} from "../../shared/dialog/confirm/confirm.component";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

  loggedUser$: Observable<User>
  isAdmin: boolean = false
  searchInput: string
  statutes$: Observable<Status[]>
  enhancedTask$: Observable<EnhancedTask[]>
  adminTableColumns: Column[] = [
    { name: 'platformName', label: 'Plateforme' },
    { name: 'compteName', label: 'Compte' },
    { name: 'userName', label: 'Assigné à' },
    { name: 'title', label: 'Titre' },
    { name: 'statusLabel', label: 'Statut' },
    { name: 'actions', label: 'Actions' },
  ]
  userTableColumns: Column[] = [
    { name: 'userName', label: 'Assigné à' },
    { name: 'title', label: 'Titre' },
    { name: 'statusLabel', label: 'Statut' },
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
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loggedUser$ = this.authService.loggedUser
    this.enhancedTask$ = this.taskService.getAllEnhancedTasks()
    this.statutes$ = this.statusService.getStatutesPerUserRole(this.loggedUser$)
    this.loggedUser$.subscribe(user => {
      this.isAdmin = this.userService.isAdmin(user)
      if (this.isAdmin)
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

  editTask(enhancedTask: EnhancedTask) {
    this.router.navigate(['/admin/task/edit/' + enhancedTask.fsId])
  }

  deleteTask(enhancedTask: EnhancedTask) {
    const refDialog = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Supprimer l\'élément',
        content: 'Voulez vous vraiement supprimer cet élément ?'
      }
    })
    refDialog.afterClosed().subscribe((result) => {
      if (CONFIRM === result) {
        this.taskService.delete(enhancedTask.fsId)
      }
    })
  }
}
