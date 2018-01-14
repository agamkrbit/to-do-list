import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  error : any;
  private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;
  constructor(public firebaseAuth : AngularFireAuth, private router: Router) {
    this.authState = this.firebaseAuth.authState;
    this.authState.subscribe( user => {
      if( user ){
        this.currentUser = user;
        //console.log(user);
      }else{
        this.currentUser = null;
      }
    }, error => {
      this.error = error;
    });
  }

  googlelogin(){
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  getAuthState(){
    return this.authState;
  }

  getUser(){
    return this.currentUser;
  }
  
  logout(){
    this.firebaseAuth.auth.signOut();
    console.log('sign out');
    this.router.navigate(['/login']);
  }
}
