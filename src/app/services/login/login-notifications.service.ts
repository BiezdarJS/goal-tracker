import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginNotificationsService {

  constructor() { }

  public nameSubject: BehaviorSubject<string> = new BehaviorSubject('');

  setName(data:string) {
    this.nameSubject.next(data);
  }


  // User Not Found Notification
  public userNotFoundSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userNotFound = this.userNotFoundSubject.asObservable();

  sendUserNotification(data:any) {
    this.userNotFoundSubject.next(data);
  }
}
