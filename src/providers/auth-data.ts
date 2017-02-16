import { Injectable } from '@angular/core';
import {
  AngularFire,
  AuthProviders,
  AuthMethods, FirebaseAuth, FirebaseAuthState
} from 'angularfire2';
import {Observable} from "rxjs";
import {UserProfile} from "../app/model/user-profile";

@Injectable()
export class AuthData {

  fireAuth: firebase.User;
  constructor(public af: AngularFire) {
    // af.auth is an AngularFireAuth extends ReplaySubject<FirebaseAuthState>
    af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;
      }
    });
  }

  getUser(){
    return this.fireAuth;
  }

  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  anonymousLogin(): any{
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });
  }

  linkAccount(email: string, password: string): any {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    const userProfile = firebase.database().ref('/userProfile');
    return this.fireAuth.link(credential).then( (user) => {
      userProfile.child(user.uid).update({
        email: email,
      });
    }, (error) => {
      console.log("Account linking error", error);
    });
  }

  resetPassword(email: string): any {
    console.log('auth() is ', firebase.auth());
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return firebase.auth().signOut();
  }

}

