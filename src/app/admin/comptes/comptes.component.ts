import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import Compte from "../../core/interfaces/Compte";
import Column from "../../shared/table/Column";
import {TableComponent} from "../../shared/table/table.component";
import {MatDialog} from "@angular/material/dialog";
import {CompteService} from "../../core/services/compte.service";
import {CANCEL, CONFIRM} from "../../shared/dialog/Constants";
import {CompteFormComponent} from "./compte-form/compte-form.component";
import EnhancedCompte from "../../core/interfaces/EnhancedCompte";
import {ConfirmComponent} from "../../shared/dialog/confirm/confirm.component";

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.scss']
})
export class ComptesComponent implements OnInit {

  enhancedComptes$: Observable<EnhancedCompte[]>;
  tableColumns: Column[] = [
    { name: 'platformLabel', label: 'Plateforme' },
    { name: 'name', label: 'Nom' },
    { name: 'firstName', label: 'Prénom' },
    { name: 'actions', label: 'Actions' },
  ]

  @ViewChild('table')
  table: TableComponent

  constructor(
    private dialog: MatDialog,
    private compteService: CompteService,
  ) { }

  ngOnInit(): void {
    this.enhancedComptes$ = this.compteService.getAllEnhancedCompte()
  }

  addCompte() {
    const ref = this.dialog.open(CompteFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Nouveau compte'
      },
    })
    ref.afterClosed().subscribe(result => {
      if (CANCEL != result) {
        this.compteService.add(result)
      }
    })
  }

  editCompte(compte: Compte) {
    const ref = this.dialog.open(CompteFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Editer compte',
        fields: compte,
      },
    })
    ref.afterClosed().subscribe(result => {
      if (CANCEL != result) {
        this.compteService.update(result)
      }
    })
  }

  deleteCompte(compte: Compte) {
    const refDialog = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Supprimer l\'élément',
        content: 'Voulez vous vraiement supprimer cet élément ?'
      }
    })
    refDialog.afterClosed().subscribe((result) => {
      if (CONFIRM === result) {
        this.compteService.delete(compte?.fsId ?? '')
      }
    })
  }
}
