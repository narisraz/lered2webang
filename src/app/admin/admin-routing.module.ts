import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {PlatformsComponent} from "./platforms/platforms.component";

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'platforms', component: PlatformsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
