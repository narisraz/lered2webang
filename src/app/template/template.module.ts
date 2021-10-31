import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmptyComponent} from './empty/empty.component';
import {MainComponent} from './main/main.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    EmptyComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    RouterModule
  ],
  exports: [
    EmptyComponent,
    MainComponent
  ]
})
export class TemplateModule { }
