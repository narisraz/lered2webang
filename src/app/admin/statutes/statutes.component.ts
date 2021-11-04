import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import Status from "../../core/interfaces/Status";
import Column from "../../shared/table/Column";
import {TableComponent} from "../../shared/table/table.component";
import {MatDialog} from "@angular/material/dialog";
import {StatusService} from "../../core/services/status.service";
import {CANCEL, CONFIRM} from "../../shared/dialog/Constants";
import {StatusFormComponent} from "./status-form/status-form.component";
import {ConfirmComponent} from "../../shared/dialog/confirm/confirm.component";

@Component({
  selector: 'app-statutes',
  templateUrl: './statutes.component.html',
  styleUrls: ['./statutes.component.scss']
})
export class StatutesComponent implements OnInit {

  statutes$: Observable<Status[]>;
  tableColumns: Column[] = [
    { name: 'label', label: 'Libellé' },
    { name: 'actions', label: 'Actions' },
  ]

  @ViewChild('table')
  table: TableComponent

  constructor(
    private dialog: MatDialog,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.statutes$ = this.statusService.getAll()
  }

  addStatus() {
    const ref = this.dialog.open(StatusFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Nouveau statut'
      },
    })
    ref.afterClosed().subscribe(result => {
      if (CANCEL != result) {
        this.statusService.add(result)
      }
    })
  }

  editStatus(status: Status) {
    const ref = this.dialog.open(StatusFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Editer statut',
        fields: status,
      },
    })
    ref.afterClosed().subscribe(result => {
      if (CANCEL != result) {
        this.statusService.update(result)
      }
    })
  }

  deleteStatus(status: Status) {
    const refDialog = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Supprimer l\'élément',
        content: 'Voulez vous vraiement supprimer cet élément ?'
      }
    })
    refDialog.afterClosed().subscribe((result) => {
      if (CONFIRM === result) {
        this.statusService.delete(status.fsId)
      }
    })
  }

}
