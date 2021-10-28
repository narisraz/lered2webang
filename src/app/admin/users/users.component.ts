import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import User from "../../core/interfaces/User";
import Column from "../../shared/table/Column";
import {TableComponent} from "../../shared/table/table.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../shared/dialog/confirm/confirm.component";
import {Observable} from "rxjs";
import {CANCEL, CONFIRM, ROLES} from "../../shared/dialog/Constants";
import {UserFormComponent} from "./user-form/user-form.component";
import {UserWithCredential} from "../UserWithCredential";
import {AuthService} from "../../core/services/auth.service";
import {map} from "rxjs/operators";
import EnhancedUser from "../../core/interfaces/EnhancedUser";
import * as _ from "lodash"


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  users$: Observable<EnhancedUser[]>
  roles = ROLES
  tableColumns: Column[] = [
    { name: 'email', label: 'Email' },
    { name: 'name', label: 'Nom' },
    { name: 'firstName', label: 'Prénom' },
    { name: 'roleLabel', label: 'Droit' },
    {
      name: 'hiringDate',
      label: 'Date d\'embauche',
      type: 'date',
      sort: {
        id: 'hiringDate',
        start: 'desc',
        disableClear: false
      }
      },
    { name: 'actions', label: 'Actions' },
  ]

  @ViewChild('table')
  table: TableComponent

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.getAll().pipe(
      map(users => users.map(user => {
        const roleLabel = ROLES[user.role]
        const enhancedUser: EnhancedUser = {
          ...user,
          name: _.upperCase(user.name),
          firstName: _.startCase(user.firstName),
          roleLabel
        }
        return enhancedUser
      }))
    )
  }

  addUser(): void {
    const ref = this.dialog.open(UserFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Nouvel utilisateur'
      },
    })
    ref.afterClosed().subscribe(result => {
      if (CANCEL != result) {
        const {confirm, ...data} = result
        this.authService.signUp(data)
      }
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
        this.userService.delete(user.fsId)
      }
    })
  }

  editUser(userWithCredential: UserWithCredential): void {
    const ref = this.dialog.open(UserFormComponent, {
      maxWidth: '500px',
      disableClose: true,
      data: {
        title: 'Nouvel utilisateur',
        fields: userWithCredential,
        disabledField: ['email', 'password', 'confirm']
      },
    })
    ref.afterClosed().subscribe(result => {
      if (CANCEL != result) {
        const {password, confirm, ...userInfo} = result
        this.userService.update(userInfo)
      }
    })
  }

}
