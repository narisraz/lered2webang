import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {PlatformsComponent} from "./platforms/platforms.component";
import {ComptesComponent} from "./comptes/comptes.component";
import {StatutesComponent} from "./statutes/statutes.component";
import {TaskFormComponent} from "../task/task-form/task-form.component";
import {ROUTE_TYPE, ROUTE_TYPE_ADD, ROUTE_TYPE_UPDATE} from "../shared/dialog/Constants";

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'platforms', component: PlatformsComponent },
  { path: 'comptes', component: ComptesComponent },
  { path: 'statutes', component: StatutesComponent },
  {
    path: 'task',
    children: [
      {
        path: 'new',
        component: TaskFormComponent,
        data: {
          title: 'Nouvelle tâche',
          type: ROUTE_TYPE.indexOf(ROUTE_TYPE_ADD)
        }
      },
      {
        path: 'edit/:taskId',
        component: TaskFormComponent,
        data: {
          title: 'Editer tâche',
          type: ROUTE_TYPE.indexOf(ROUTE_TYPE_UPDATE)
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
