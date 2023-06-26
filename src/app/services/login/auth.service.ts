import { Injectable, OnInit } from '@angular/core';
// Models
import { User } from 'src/app/models/user.model';
// Services
import { UserService } from '../settings/user.service';
import { NameNotificationService } from './name-notification.service';
// Router
import { Router } from '@angular/router';
// RxJS
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Welcome Name
  welcomeName!:any;

  constructor(
    private nameNotificationS: NameNotificationService,
    private router: Router,
    private userService: UserService
  ) {
    // Welcome Name
    this.nameNotificationS.nameSubject.subscribe(d => {
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
      }
      if (users.length === 0) {
        console.log('Nie znaleziono użytkownika');
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
