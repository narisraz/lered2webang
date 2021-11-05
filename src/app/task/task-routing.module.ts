import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyTasksComponent} from "./my-tasks/my-tasks.component";

const routes: Routes = [
  { path: 'list', component: MyTasksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
