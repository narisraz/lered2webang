import {Injectable} from '@angular/core';
import {CrudService} from "./crud.service";
import Task from "../interfaces/Task";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TASK_COLLECTION} from "../../shared/dialog/Constants";
import {combineLatest, Observable} from "rxjs";
import EnhancedTask from "../interfaces/EnhancedTask";
import {map} from "rxjs/operators";
import {StatusService} from "./status.service";
import {PlatformService} from "./platform.service";
import {CompteService} from "./compte.service";
import {UserService} from "./user.service";
import {CommentService} from "./comment.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends CrudService<Task>{

  constructor(
    private firestore: AngularFirestore,
    private statusService: StatusService,
    private platformService: PlatformService,
    private compteService: CompteService,
    private userService: UserService,
    private commentService: CommentService
  ) {
    super(firestore)
    super.collection = TASK_COLLECTION
  }

  getEnhancedTask(taskId: string): Observable<EnhancedTask | undefined> {
    return combineLatest([
      super.get(taskId),
      this.statusService.getAll(),
      this.platformService.getAll(),
      this.compteService.getAll(),
      this.userService.getAll()
    ]).pipe(
      map(([task, statutes, platforms, comptes, users]): EnhancedTask => {
        const data: EnhancedTask = {
          ...task,
          statusLabel: statutes.find(status => status.fsId == task?.statusId)?.label,
          platformName: platforms.find(platform => platform.fsId == task?.platformId)?.name,
          compteName: comptes.find(compte => compte.fsId == task?.compteId)?.name,
          userName: users.find(user => user.fsId == task?.userId)?.firstName
        }
        return data
      })
    )
  }

  getAllEnhancedTasks(): Observable<EnhancedTask[]> {
    return combineLatest([
      super.getAll(),
      this.statusService.getAll(),
      this.platformService.getAll(),
      this.compteService.getAll(),
      this.userService.getAll()
    ]).pipe(
      map(([tasks, statutes, platforms, comptes, users]): EnhancedTask[] => {
        return tasks.map((task): EnhancedTask => {
          return {
            ...task,
            statusLabel: statutes.find(status => status.fsId == task.statusId)?.label,
            platformName: platforms.find(platform => platform.fsId == task.platformId)?.name,
            compteName: comptes.find(compte => compte.fsId == task.compteId)?.name,
            userName: users.find(user => user.fsId == task.userId)?.firstName
          }
        })
      })
    )
  }

  updateStatus(fsId: string, statusId: string): Promise<any> {
    return this.firestore.collection<Task>(TASK_COLLECTION).doc(fsId).update({
      statusId: statusId,
      updateDate: this.now()
    })
  }

  addComment(fsId: string, userId: string, comment: string): Promise<any> {
    const commentId = this.firestore.createId()
    return this.commentService.addTaskComment(fsId, {
      value: comment,
      fsId: commentId,
      userId: userId
    })
  }
}
