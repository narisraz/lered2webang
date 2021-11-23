import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {TaskService} from "../../core/services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import SelectData from "../../shared/form/select-field/SelectData";
import {StatusService} from "../../core/services/status.service";
import Status from "../../core/interfaces/Status";
import EnhancedTask from "../../core/interfaces/EnhancedTask";
import User from "../../core/interfaces/User";
import {UserService} from "../../core/services/user.service";
import {AuthService} from "../../core/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import EnhancedComment from "../../core/interfaces/EnhancedComment";
import {CommentService} from "../../core/services/comment.service";
import {CONFIRM, TASK_COLLECTION} from "../../shared/dialog/Constants";
import {ConfirmComponent} from "../../shared/dialog/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {

  collection = TASK_COLLECTION

  formGroup: FormGroup
  isAdmin = false
  enhancedTask?: EnhancedTask
  loggedUser: User
  taskSubscription: Subscription
  userSubscription: Subscription

  task$: Observable<EnhancedTask | undefined>
  statutes$: Observable<Status[]>
  users$: Observable<User[]>
  statutesSelectData$: Observable<SelectData[]>;
  usersSelectData$: Observable<SelectData[]>
  comments$: Observable<EnhancedComment[]>

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private statusService: StatusService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private commentService: CommentService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.loggedUser.subscribe(user => {
      this.loggedUser = user
      this.isAdmin = this.userService.isAdmin(user)
    })
    this.activatedRoute.params.subscribe(params => {
      const taskId = params['taskId']
      this.task$ = this.taskService.getEnhancedTask(taskId)

      this.statutes$ = this.statusService.getAll()
      this.users$ = this.userService.getAll()

      this.statutesSelectData$ = this.statusService.toSelectData(this.statutes$)
      this.usersSelectData$ = this.userService.toSelectData(this.users$)

      this.comments$ = this.commentService.getEnhancedComments(taskId)

      const data = {
        statusId: ['', [Validators.required]],
        comment: ['']
      }
      this.formGroup = this.formBuilder.group(data)

      this.taskSubscription = this.task$.subscribe(task => {
        this.enhancedTask = task
        this.f['statusId'].setValue(task?.statusId)
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

  saveComment() {
    const comment = this.f['comment'].value
    this.taskService.addComment(this.enhancedTask?.fsId ?? '', this.loggedUser?.fsId ?? '', comment).then(() => {
      this.snackBar.open('Commentaire ajouté avec succès', 'Ok', {
        panelClass: ['bg-green-600', 'text-white'],
        verticalPosition: 'top',
        duration: 3000
      })
    }).then(() => {
      this.f['comment'].setValue('')
    })
  }

  delete(fsId: string) {
    const refDialog = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Supprimer de la tâche',
        content: 'Voulez vous vraiement supprimer cette tâche ?'
      }
    })
    refDialog.afterClosed().subscribe((result) => {
      if (CONFIRM === result) {
        this.taskService.delete(fsId).then(() => {
          this.router.navigate(["/task/list"])
        }).then(() => {
          this.snackBar.open('Tâche supprimé avec succès', 'Ok', {
            panelClass: ['bg-green-600', 'text-white'],
            verticalPosition: 'top',
            duration: 3000
          })
        })
      }
    })
  }
}
