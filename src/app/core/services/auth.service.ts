import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserWithCredential} from "../../admin/UserWithCredential";
import {UserService} from "./user.service";
import User from "../interfaces/User";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser: Observable<User>

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) { }

  signUp(userWithCredential: UserWithCredential): Promise<any> {
    const {email, password, ...userInfo} = userWithCredential
    return this.afAuth.createUserWithEmailAndPassword(email,password)
      .then(ref => {
        const authId = ref.user!.uid
        const user: User = {
          ...userInfo,
          email,
          authId
        }
        return user
      }).then(user => this.userService.add(user))
  }

  signIn(email: string, password: string): Promise<string | null | undefined> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        this.loggedUser = this.userService.findByAuthId(value.user?.uid ?? '').pipe(
          map(users => users[0])
        )
        return value
      })
      .then(value => value.user?.uid)
      .catch(() => undefined)
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut()
  }

  recoverPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email)
  }
}
