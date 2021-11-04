import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {PlatformsComponent} from "./platforms/platforms.component";
import {ComptesComponent} from "./comptes/comptes.component";
import {StatutesComponent} from "./statutes/statutes.component";

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'platforms', component: PlatformsComponent },
  { path: 'comptes', component: ComptesComponent },
  { path: 'statutes', component: StatutesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
