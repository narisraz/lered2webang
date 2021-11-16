import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {CANCEL, CONFIRM} from "../../shared/dialog/Constants";
import TableColumn from "../../shared/table/TableColumn";
import {TableComponent} from "../../shared/table/table.component";
import {MatDialog} from "@angular/material/dialog";
import Platform from "../../core/interfaces/Platform";
import {PlatformService} from "../../core/services/platform.service";
import {PlatformFormComponent} from "./platform-form/platform-form.component";
import {ConfirmComponent} from "../../shared/dialog/confirm/confirm.component";

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent implements OnInit {

  platforms$: Observable<Platform[]>
  tableColumns: TableColumn[] = [
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
    })
  }

  editPlatform(platform: Platform) {
    const ref = this.dialog.open(PlatformFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Editer platforme',
        fields: platform,
      },
    })
    ref.afterClosed().subscribe(result => {
      if (CANCEL != result) {
        this.platformService.update(result)
      }
    })
  }

  deletePlatform(platform: Platform) {
    const refDialog = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Supprimer l\'élément',
        content: 'Voulez vous vraiement supprimer cet élément ?'
      }
    })
    refDialog.afterClosed().subscribe((result) => {
      if (CONFIRM === result) {
        this.platformService.delete(platform?.fsId ?? '')
      }
    })
  }

}
