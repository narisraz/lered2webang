import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DialogModule} from "./dialog/dialog.module";
import {FormModule} from "./form/form.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MomentModule} from "ngx-moment";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CommentComponent} from './comment/comment.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {QuillModule} from "ngx-quill";
import {CommentFormComponent} from './comment/comment-form/comment-form.component';
import {KanbanComponent} from './kanban/kanban.component';
import {DragDropModule} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    TableComponent,
    CommentComponent,
    CommentFormComponent,
    KanbanComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FormModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        m: 59
      }
    }),
    MatSnackBarModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    QuillModule,
    DragDropModule
  ],
  exports: [
    DialogModule,
    TableComponent,
    CommentComponent,
    FormModule,
    KanbanComponent
  ]
})
export class SharedModule { }
