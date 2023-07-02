import { Injectable, OnInit } from '@angular/core';
// Models
import { User } from 'src/app/models/user.model';
// Services
import { UserService } from '../settings/user.service';
import { NameNotificationService } from './name-notification.service';
// Router
import { Router } from '@angular/router';
// RxJS
import { BehaviorSubject, map } from 'rxjs';
import { LoginNotificationsService } from './login-notifications.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Welcome Name
  welcomeName!:any;

  constructor(
    private loginNotificationS: LoginNotificationsService,
    private router: Router,
    private userService: UserService
  ) {
    // Welcome Name
    this.loginNotificationS.nameSubject.subscribe(d => {
      this.welcomeName = d;
    });
  }



  public signIn(userData:User) {
    this.userService.fetchUsers().pipe(
      map(users => {
        users = users.filter((user:any) => user.username === userData.username && user.password == userData.password)
        return users;
      })
    ).subscribe(users => {
      if (users.length > 0) {
        this.router.navigateByUrl('');
        sessionStorage.setItem('theme', "theme-light");
        sessionStorage.setItem('access-token', "logged-in");
        sessionStorage.setItem('welcome-name', this.welcomeName);
        // Set Not Found User
        this.loginNotificationS.sendUserNotification(false);
      }
      if (users.length === 0) {
        // Set Not Found User
        this.loginNotificationS.sendUserNotification(true);
      }
    });
  }

  public isLoggedIn() {
    return sessionStorage.getItem('access-token') === 'logged-in';
  }

  public logout() {
    sessionStorage.removeItem('theme');
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('welcome-name');
    sessionStorage.removeItem('welcome-message');
  }




}
