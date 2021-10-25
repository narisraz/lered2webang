import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import User from "../../core/interfaces/User";
import Column from "../../shared/table/Column";
import {TableComponent} from "../../shared/table/table.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../shared/dialog/confirm/confirm.component";
import {Observable} from "rxjs";
import {CONFIRM} from "../../shared/dialog/Constants";
import {UserFormComponent} from "./user-form/user-form.component";
import {UserWithCredential} from "./UserWithCredential";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>
  tableColumns: Column[] = [
    { name: 'name', label: 'Nom' },
    { name: 'firstName', label: 'Prénom' },
    { name: 'actions', label: 'Actions' },
  ]

  @ViewChild('table')
  table: TableComponent

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.getAll()
  }

  addUser(): void {
    const ref = this.dialog.open(UserFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Nouvel utilisateur'
      },
    })
    ref.afterClosed().subscribe((result: User) => {
      this.userService.add(result)
    })
  }

  deleteUser(user: User): void {
    const refDialog = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Supprimer l\'élément',
        content: 'Voulez vous vraiement supprimer cet élément ?'
      }
    })
    refDialog.afterClosed().subscribe((result) => {
      if (CONFIRM === result) {
        this.users$ = this.userService.delete(user)
        this.users$.subscribe(users => this.table.newDataSource(users))
      }
    })
  }

  editUser(user: User): void {
    const userWithCredential: UserWithCredential = {
      name: 'Raz',
      userId: '0',
      id: '0',
      email: 'naris@gmail.com',
      firstName: 'Naris',
      password: 'bob.12'
    }
    const ref = this.dialog.open(UserFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Nouvel utilisateur',
        fields: userWithCredential
      },
    })
    ref.afterClosed().subscribe((result: User) => {
      this.userService.add(result)
    })
  }

}
