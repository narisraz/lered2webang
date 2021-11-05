import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TaskRoutingModule} from './task-routing.module';
import {MyTasksComponent} from './my-tasks/my-tasks.component';
import {TemplateModule} from "../template/template.module";
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {TaskFormComponent} from './task-form/task-form.component';


@NgModule({
  declarations: [
    MyTasksComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    TemplateModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class TaskModule { }
