import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from '@firebase/app-compat';
import { nav_path } from '../app-routing.module';
import { NotificationService } from './notification.service';
import { trace } from '@angular/fire/compat/performance';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private unsub$: Subject<any> = new Subject<any>();
  userData: any; // Save logged in user data
  private _isUserAuthenticated$ = new BehaviorSubject<boolean>(false);
  private _userData$ = new BehaviorSubject<any>(null);
  public isUserAuthenticated$ = this._isUserAuthenticated$.asObservable();
  public userData$ = this._userData$.asObservable();

  constructor(
    public afs: AngularFirestore,
    public readonly auth: AngularFireAuth,
    public router: Router,
    private notification: NotificationService,
    public afAuth: AngularFireAuth,
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.auth.authState.pipe(takeUntil(this.unsub$)).subscribe((user) => {
      if (user) {
        this.userData = user;
        this.setUserData(user);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', null!);
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }
  setUserAuthenticationStatus(isUserAuthenticated: boolean) {
    this._isUserAuthenticated$.next(isUserAuthenticated);
  }
  setUserData(userData: any) { this._userData$.next(userData); }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.setUserAuthenticationStatus(true);
        this.SetUserData(userCredential.user)
          .then(() => this.router.navigate([nav_path.DASHBOARD]));
      }).catch((error) => {
        this.setUserAuthenticationStatus(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        this.notification.sendNotification(`❌ ${errorMessage}`);
      })
  }
  // Sign up with email/password
  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        this.setUserAuthenticationStatus(true);
        const user = userCredential.user;
        this.sendVerificationMail(user);
        this.SetUserData(user).then(() => {
          this.notification.sendNotification('Welcome, hope you enjoy 🎉');
          this.router.navigate([nav_path.BLOG])
        })
          .catch(error => this.notification.sendNotification('Error occurred while creating your account!'));
      })
      .catch((error) => {
        this.setUserAuthenticationStatus(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        this.notification.sendNotification(`❌ ${errorMessage}`);
      })
  }
  // Send email verification when new user sign up
  // TODO: Need to create page for this
  sendVerificationMail(userCredential: any) {
    return userCredential.sendEmailVerification()
      .then(() => {
        return
        // this.router.navigate([nav_path.VERIFY_EMAIL]);
      })
  }
  // Reset Forgot password
  forgotPassword(passwordResetEmail: string) {
    return this.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.notification.sendNotification(`✅ Password reset email sent, check your inbox.`);
        this.router.navigate([nav_path.LOGIN]);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.notification.sendNotification(`❌ ${errorMessage}`);
      })
  }
  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    let isUserLoggedIn = false;
    this.afAuth.authState.pipe(trace('auth'), map(u => !!u))
      .pipe(takeUntil(this.unsub$)).subscribe(isLoggedIn => {
        isUserLoggedIn = isLoggedIn;
      this.setUserAuthenticationStatus(isLoggedIn);
      });
    return isUserLoggedIn
  }
  // Sign in with Google
  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  authLogin(provider: any) {
    return this.auth.signInWithPopup(provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.SetUserData(result.user)
          .then(() => {
            this.setUserAuthenticationStatus(true);
            this.router.navigate([nav_path.DASHBOARD]).then(() => {
              this.notification.sendNotification(`✔ Welcome ${user.displayName}`);
            })
          });
      }).catch((error) => {
        this.setUserAuthenticationStatus(false);
        this.handleErrors(error);
      })
  }

  handleErrors(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == 'auth/popup-blocked') {
      let popupMessage = 'Unable to establish a connection with the popup. It may have been blocked by the browser.';
      this.notification.sendNotification(popupMessage);
    } else if (errorCode == 'auth/cancelled-popup-request') {
      return
    } else {
      this.notification.sendNotification('❌ Uncaught error occurred!');
      console.error(errorMessage);
    }
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, { merge: true })
  }
  // Sign out
  logOut() {
    return this.auth.signOut().then(() => {
      this.setUserAuthenticationStatus(false);
      localStorage.removeItem('user');
      this.router.navigate([nav_path.HOME]);
    }).catch(error => {
      this.notification.sendNotification('Error occurred while trying to sign out');
      console.error(error);
    })
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
