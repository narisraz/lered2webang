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


@NgModule({
  declarations: [
    TableComponent,
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
    FormModule
  ],
  exports: [
    DialogModule,
    TableComponent,
    FormModule
  ]
})
export class SharedModule { }