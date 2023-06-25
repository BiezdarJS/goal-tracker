import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksNotificationsService {

  constructor() { }

  // New Task Trigger
  public newTaskSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  newTaskValue = this.newTaskSubject.asObservable();

  sendTasksNotification(data:any) {
    this.newTaskSubject.next(data);
  }

}
