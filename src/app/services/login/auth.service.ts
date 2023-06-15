import { Injectable } from '@angular/core';
// Models
import { User } from 'src/app/models/user.model';
// Services
import { UserService } from '../settings/user.service';
// Router
import { Router } from '@angular/router';
// RxJS
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }


  public signIn(userData:User) {
    this.userService.fetchUsers().pipe(
      map(users => {
        users = users.filter((user:any) => user.username === userData.username && user.password == userData.password)
        return users;
      })
    ).subscribe(users => {
      console.log(users);
      if (users.length > 0) {
        this.router.navigateByUrl('');
        localStorage.setItem('ACCESS_TOKEN', "logged-in");
      }
      if (users.length === 0) {
        console.log('Nie znaleziono użytkownika');
      }
    });
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') === 'logged-in';
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

}
