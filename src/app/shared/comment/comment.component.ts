import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentService} from "../../core/services/comment.service";
import {Observable, of} from "rxjs";
import EnhancedComment from "../../core/interfaces/EnhancedComment";
import Comment from "../../core/interfaces/Comment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CANCEL, CONFIRM, TASK_COLLECTION} from "../dialog/Constants";
import {ConfirmComponent} from "../dialog/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {CommentFormComponent} from "./comment-form/comment-form.component";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input() comments$: Observable<EnhancedComment[]>
  @Input() loggedUserId: string
  @Input() parent: string
  @Input() parentId: string

  formGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const data = {
      comment: ['']
    }
    this.formGroup = this.formBuilder.group(data)
  }

  isOwner(comment: Comment) {
    return comment.userId == this.loggedUserId
  }

  edit(comment: Comment) {
    const ref = this.dialog.open(CommentFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Editer commentaire',
        fields: comment,
      },
    })
    ref.afterClosed().subscribe(result => {
      if (CANCEL != result) {
        let obs = of().toPromise()

        if (this.parent == TASK_COLLECTION) {
          obs = this.commentService.updateTaskComment(this.parentId, result)
        }

        obs.then(() => {
          this.snackBar.open('Commentaire modifié avec succès', 'Ok', {
            panelClass: ['bg-green-600', 'text-white'],
            verticalPosition: 'top',
            duration: 3000
          })
        }).then(() => {
          this.f['comment'].setValue('')
        })
      }
    })
  }

  get f() { return this.formGroup.controls }

  saveComment(odlComment: Comment) {
    const newComment = this.f['comment'].value
    let obs = of().toPromise()

    if (this.parent == TASK_COLLECTION) {
      obs = this.commentService.addTaskComment(this.parentId, {
        ...odlComment,
        value: newComment
      })
    }

    obs.then(() => {
      this.snackBar.open('Commentaire modifié avec succès', 'Ok', {
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
        title: 'Supprimer l\'élément',
        content: 'Voulez vous vraiement supprimer cet élément ?'
      }
    })
    refDialog.afterClosed().subscribe((result) => {
      if (CONFIRM === result) {
        let obs = of().toPromise()

        if (this.parent == TASK_COLLECTION) {
          obs = this.commentService.deleteTaskComment(this.parentId, fsId)
        }

        obs.then(() => {
          this.snackBar.open('Commentaire supprimé avec succès', 'Ok', {
            panelClass: ['bg-green-600', 'text-white'],
            verticalPosition: 'top',
            duration: 3000
          })
        })
      }
    })
  }
}
