import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyTasksComponent} from "./my-tasks/my-tasks.component";
import {TaskDetailComponent} from "./task-detail/task-detail.component";

const routes: Routes = [
  { path: 'list', component: MyTasksComponent },
  { path: 'detail/:taskId', component: TaskDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
