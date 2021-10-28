import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserWithCredential} from "../../admin/users/UserWithCredential";
import {UserService} from "./user.service";
import User from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) { }

  signup(userWithCredential: UserWithCredential): Promise<any> {
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

  signin(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }
}
