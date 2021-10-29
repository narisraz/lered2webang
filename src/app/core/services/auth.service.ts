import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserWithCredential} from "../../admin/UserWithCredential";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import firebase from "firebase/compat/app";
import User from "../interfaces/User";
import {flatMap} from "rxjs/internal/operators";
import {LOCALSTORAGE_ROLE_ID} from "../../shared/dialog/Constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.loggedUser.subscribe(user => {
      if (user)
        localStorage.setItem(LOCALSTORAGE_ROLE_ID, user.role.toString())
    })
  }

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
    return this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(value => value.user?.uid)
      .catch(() => undefined)
    })
  }

  signOut(): Promise<void> {
    localStorage.removeItem(LOCALSTORAGE_ROLE_ID)
    return this.afAuth.signOut()
  }

  recoverPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email)
  }

  get loggedUser(): Observable<User> {
    return this.afAuth.authState.pipe(
      flatMap(user => this.userService.findByAuthId(user?.uid ?? ''))
    )
  }
}
