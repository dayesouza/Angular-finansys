import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { IUser } from "src/app/security/model/IUser";
import { AngularFireAuth } from "@angular/fire/auth";
import { switchMap } from "rxjs/operators";
import { auth } from "firebase";

@Injectable({ providedIn: "root" })
export class AuthService {
  user: Observable<IUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider).then((l) =>
      this.router.navigate(["perfil"])
    );
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      console.log(credential);
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

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }
}
