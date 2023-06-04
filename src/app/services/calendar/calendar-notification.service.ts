import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarNotificationService {

  public notificationSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  switcherBtnHasBeenFired = this.notificationSubject.asObservable();

  constructor() { }

  sendNotification(data:any) {
    this.notificationSubject.next(data);
  }
}
