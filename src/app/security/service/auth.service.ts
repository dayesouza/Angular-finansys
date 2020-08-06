import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { IUser } from "../../security/model/IUser";
import { AngularFireAuth } from "@angular/fire/auth";
import { switchMap } from "rxjs/operators";
import * as firebase from "firebase/app";

@Injectable({ providedIn: "root" })
export class AuthService {
  private userDetails: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userDetails = user;
        localStorage.setItem("user", JSON.stringify(user));
        JSON.parse(localStorage.getItem("user"));
      } else {
        this.userDetails = null;
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider).then((l) =>
      this.router.navigate(["perfil"])
    );
  }

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider).then((credential) => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  returnUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null ? true : false;
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["/"]);
    });
  }
}
