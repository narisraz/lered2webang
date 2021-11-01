import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import EnhancedUser from "../../core/interfaces/EnhancedUser";
import {CANCEL, ROLES} from "../../shared/dialog/Constants";
import Column from "../../shared/table/Column";
import {TableComponent} from "../../shared/table/table.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../core/services/user.service";
import {AuthService} from "../../core/services/auth.service";
import {map} from "rxjs/operators";
import * as _ from "lodash";
import Platform from "../../core/interfaces/Platform";
import {PlatformService} from "../../core/services/platform.service";
import {UserFormComponent} from "../users/user-form/user-form.component";
import {PlatformFormComponent} from "./platform-form/platform-form.component";

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent implements OnInit {

  platforms$: Observable<Platform[]>
  tableColumns: Column[] = [
    { name: 'name', label: 'Nom' },
    { name: 'url', label: 'URL' },
    { name: 'actions', label: 'Actions' },
  ]

  @ViewChild('table')
  table: TableComponent

  constructor(
    private dialog: MatDialog,
    private platformService: PlatformService
  ) {}

  ngOnInit(): void {
    this.platforms$ = this.platformService.getAll()
  }

  addPlatform() {
    const ref = this.dialog.open(PlatformFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Nouvelle platforme'
      },
    })
    ref.afterClosed().subscribe(result => {
      if (CANCEL != result) {
        this.platformService.add(result)
      }
    })}

  editPlatform(platform: Platform) {}

  deletePlatform(platform: Platform) {}

}
