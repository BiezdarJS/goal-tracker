import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }





  // Users
  fetchUsers():Observable<any> {
    // Fetch Users
    return this.http
      .get('https://goal-mangement-system-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map((response:any) => {
          const usersArray = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              usersArray.push({ ...response[key], id: key });
            }
          }
          return usersArray;
        })
      );
  }

  postUser(newUser:any):void {
    this.http.post(
      'https://goal-mangement-system-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      newUser
    ).subscribe(responseData => {})
  }




}
