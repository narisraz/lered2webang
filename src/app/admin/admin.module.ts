import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {UsersComponent} from './users/users.component';
import {TemplateModule} from "../template/template.module";
import {SharedModule} from "../shared/shared.module";
import {UserFormComponent} from './users/user-form/user-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PlatformsComponent } from './platforms/platforms.component';
import { PlatformFormComponent } from './platforms/platform-form/platform-form.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    PlatformsComponent,
    PlatformFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TemplateModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
