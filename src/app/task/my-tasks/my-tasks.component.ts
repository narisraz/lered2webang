import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {StatusService} from "../../core/services/status.service";
import {Observable} from "rxjs";
import Status from "../../core/interfaces/Status";
import EnhancedTask from "../../core/interfaces/EnhancedTask";
import {TaskService} from "../../core/services/task.service";
import {map} from "rxjs/operators";
import TableColumn from "../../shared/table/TableColumn";
import {TableComponent} from "../../shared/table/table.component";
import User from "../../core/interfaces/User";
import {AuthService} from "../../core/services/auth.service";
import {UserService} from "../../core/services/user.service";
import {CONFIRM} from "../../shared/dialog/Constants";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ConfirmComponent} from "../../shared/dialog/confirm/confirm.component";
import Platform from "../../core/interfaces/Platform";
import {PlatformService} from "../../core/services/platform.service";
import Board from "../../shared/kanban/models/board.model";
import KanbanColumn from "../../shared/kanban/models/column.model";
import KanbanData from "../../shared/kanban/models/kanban-data.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

  tableView = false
  kanbanView = true

  loggedUser$: Observable<User>
  isAdmin: boolean = false
  platforms$: Observable<Platform[]>
  statutes$: Observable<Status[]>
  enhancedTask$: Observable<EnhancedTask[]>
  kanbanBoard$: Observable<Board<any>>
  tableColumns: TableColumn[] = [
    { name: 'platformName', label: 'Plateforme' },
    { name: 'compteName', label: 'Compte' },
    { name: 'userName', label: 'Assigné à' },
    { name: 'title', label: 'Titre' },
    { name: 'statusLabel', label: 'Statut' },
    { name: 'actions', label: 'Actions' },
  ]

  @ViewChildren('table')
  tables: QueryList<TableComponent>

  constructor(
    private taskService: TaskService,
    private platformService: PlatformService,
    private authService: AuthService,
    private userService: UserService,
    private statusService: StatusService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loggedUser$ = this.authService.loggedUser
    this.enhancedTask$ = this.taskService.getAllEnhancedTasks()
    this.platforms$ = this.platformService.getAll()
    this.statutes$ = this.statusService.getStatutesPerUserRole(this.loggedUser$)
    this.loggedUser$.subscribe(user => {
      this.isAdmin = this.userService.isAdmin(user)
    })
    this.kanbanBoard$ = this.buildBoard()
  }

  tasksByPlatform(platformId: string) {
    return this.enhancedTask$.pipe(
      map(tasks => tasks.filter(task => task.platformId == platformId))
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
        this.taskService.delete(enhancedTask?.fsId ?? '')
      }
    })
  }

  filter(value: string) {
    this.tables.map(table => {
      table.doFilter(value)
    })
  }

  buildBoard(): Observable<Board<any>> {
    return this.statutes$.pipe(
      map(statutes => {
        const board: Board<EnhancedTask> = {
          name: 'Vue kanban',
          ids: this.generateIds(statutes),
          columns: this.generateKanbanColumns(statutes)
        }
        return board
      }),
    )
  }

  generateIds(statutes: Status[]): string[] {
    return statutes.map(status => status?.fsId ?? '')
  }

  generateKanbanColumns(statutes: Status[]): KanbanColumn<EnhancedTask>[] {
    return statutes.map(status => {
      const task: KanbanColumn<EnhancedTask> = {
        name: status.label,
        id: status?.fsId ?? '',
        items: this.tasksByStatus(status)
      }
      return task
    })
  }

  tasksByStatus(status: Status): Observable<EnhancedTask[]> {
    return this.enhancedTask$.pipe(
      map(tasks => tasks.filter(task => task.statusId == status?.fsId ?? '')),
    );
  }

  viewTaskDetail(enhancedTask: EnhancedTask) {
    this.router.navigate(['/task/detail/' + enhancedTask.fsId])
  }

  switchToKanbanView() {
    this.kanbanView = true
    this.tableView = false
  }

  switchToTableView() {
    this.kanbanView = false
    this.tableView = true
  }

  changeStatus(kanbanData: KanbanData) {
    this.taskService.updateStatus(kanbanData.data?.fsId ?? '', kanbanData.containerId).then(() => {
      this.snackBar.open('Statut mis à jour avec succès', 'Ok', {
        panelClass: ['bg-green-600', 'text-white'],
        verticalPosition: 'top',
        duration: 3000
      })
    })
  }
}
