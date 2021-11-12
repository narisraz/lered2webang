import { Injectable } from '@angular/core';
import {CrudService} from "./crud.service";
import User from "../interfaces/User";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {COMMENT_COLLECTION, TASK_COLLECTION, USER_COLLECTION} from "../../shared/dialog/Constants";
import Comment from "../interfaces/Comment";
import {UserService} from "./user.service";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import EnhancedComment from "../interfaces/EnhancedComment";
import * as _ from "lodash"
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class CommentService extends CrudService<Comment> {

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {
    super(firestore)
    super.collection = COMMENT_COLLECTION
  }

  getByTask(taskId: string): Observable<Comment[]> {
    return this.firestore.collection<Task>(TASK_COLLECTION).doc(taskId).collection<Comment>(COMMENT_COLLECTION).valueChanges()
  }

  addTaskComment(taskId: string, comment: Comment): Promise<any> {
    return this.firestore.collection<Task>(TASK_COLLECTION).doc(taskId).collection<Comment>(COMMENT_COLLECTION).doc(comment.fsId).set({
      ...comment,
      insertDate: this.now
    })
  }

  updateTaskComment(taskId: string, comment: Comment): Promise<any> {
    return this.firestore.collection<Task>(TASK_COLLECTION).doc(taskId).collection<Comment>(COMMENT_COLLECTION).doc(comment.fsId).set({
      ...comment,
      updateDate: this.now
    })
  }

  deleteTaskComment(taskId: string, commentId: string): Promise<any> {
    return this.firestore.collection<Task>(TASK_COLLECTION).doc(taskId).collection<Comment>(COMMENT_COLLECTION).doc(commentId).delete()
  }

  getEnhancedComments(taskId: string): Observable<EnhancedComment[]> {
    return combineLatest([
      this.userService.getAll(),
      this.getByTask(taskId)
    ]).pipe(
      map(([users, comments]): EnhancedComment[] => {
        const enhancedComments = comments.map(comment => {
          return {
            ...comment,
            userName: users.find(user => user.fsId == comment.userId)?.name ?? ''
          }
        })
        return _.orderBy(enhancedComments, (comment) => {
          return moment(comment.insertDate)
        }, ["asc"])
      })
    )
  }

}
