import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: User;

  constructor(private authService: AuthService, private afStore: AngularFirestore) { 
                //authService.getCurrentUser returns an Observable of afAuth.authState. Sets currentUser on login
                authService.getCurrentUser().subscribe(currentUser => {
                  if (currentUser) {
                    // console.log("Seteo de currentUser en UserService: ", currentUser)
                    this.getLoggedInUser(currentUser.uid).subscribe(loggedInUser => {
                      // console.log("Seteo de currentUser en UserService: ", loggedInUser)
                      this.currentUser = loggedInUser
                    })
                  } else {
                    // console.log("Seteo null en userService.")
                    this.currentUser = null
                  }
                });
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.authService.login(email, password);
  }

  public signUpUser(newUser: User, password: string): Promise<void> {
    return this.authService.signUp(newUser.email, password).then(createdUser => 
      this.addNewUserData(newUser, createdUser)
    )
  }

  private addNewUserData(newUser: User, user: firebase.auth.UserCredential) {
    newUser.uid = user.user.uid
    user.user.updateProfile({
      displayName: newUser.displayName
    })

    this.afStore.doc<User>(`users/${user.user.uid}`).set(Object.assign({}, newUser), { merge: true });
  }

  public logoutUser(): Promise<void> {
    // console.log("Logout user userService.")
    return this.authService.logout().then(() => {
      // console.log("userService.then del authService.logout.")
    });
  }

  private getLoggedInUser(uid: string) {
    return this.afStore.doc<User>(`users/${uid}`).valueChanges();
  }
}
