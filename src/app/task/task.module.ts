import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TaskRoutingModule} from './task-routing.module';
import {MyTasksComponent} from './my-tasks/my-tasks.component';
import {TemplateModule} from "../template/template.module";
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {TaskFormComponent} from './task-form/task-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {QuillModule} from "ngx-quill";
import {MatListModule} from "@angular/material/list";
import {MomentModule} from "ngx-moment";
import {TaskCardComponent} from './task-card/task-card.component';


@NgModule({
  declarations: [
    MyTasksComponent,
    TaskFormComponent,
    TaskDetailComponent,
    TaskCardComponent
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
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    QuillModule,
    MatListModule,
    MomentModule
  ],
  exports: [
    TaskFormComponent
  ]
})
export class TaskModule { }
