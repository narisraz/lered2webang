import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {StatusService} from "../../core/services/status.service";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
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
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from "moment";


@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

  tableView = false
  kanbanView = true
  formGroup: FormGroup

  searchSubject$ = new BehaviorSubject('')
  startSubject$ = new BehaviorSubject(moment().subtract(5, 'd').local(true).set({h: 0, m: 0}))
  endSubject$ = new BehaviorSubject(moment().local(true).set({h: 23, m: 59}))
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
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      start: [moment().subtract(5, 'd').local(true).format()],
      end: [moment().local(true).format()],
    })
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
    if (this.kanbanView) {
      this.searchSubject$.next(value)
    } else {
      this.tables.map(table => {
        table.doFilter(value)
      })
    }
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
    return combineLatest([
      this.startSubject$,
      this.endSubject$,
      this.searchSubject$,
      this.enhancedTask$
    ]).pipe(
      map(([startDate, endDate, searchValue, tasks]) => {
        let filteredTasks = tasks.filter(task => task.statusId == status?.fsId ?? '')
        if (startDate && endDate) {
          filteredTasks = filteredTasks.filter(task => {
            return moment(task.insertDate).isBetween(startDate, endDate)
          })
        }
        if (searchValue) {
          return filteredTasks.filter(filteredTask =>
            filteredTask.userName?.toLowerCase().includes(searchValue.toLowerCase())
            || filteredTask.title?.toLowerCase().includes(searchValue.toLowerCase()))
        }
        return filteredTasks
      })
    )
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

  get f() { return this.formGroup.controls }

  startDateChange() {
    const startDate = this.f['start'].value
    this.startSubject$.next(moment(startDate, 'DD/MMM/YYYY').set({h: 0, m: 0}))
  }

  endDateChange() {
    const endDate = this.f['end'].value
    this.endSubject$.next(moment(endDate, 'DD/MMM/YYYY').set({h: 23, m: 59}))
  }
}
