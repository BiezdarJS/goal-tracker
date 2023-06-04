import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GoalsViewType } from 'src/app/enums/goals.view-type';

@Injectable({
  providedIn: 'root'
})
export class GoalsNotificationsService {

  public get GoalsViewType() {
    return GoalsViewType;
  }

  // Change Filter Notification
  public filterChangeSubject:BehaviorSubject<boolean> = new BehaviorSubject(false);
  filterChanged = this.filterChangeSubject.asObservable();

  sendFilterNotification(data:boolean) {
    this.filterChangeSubject.next(data);
  }


  // Change View Notification
  public viewChangeSubject: BehaviorSubject<string> = new BehaviorSubject('grid');
  activeGoalsViewType = this.viewChangeSubject.asObservable();

  sendViewNotification(data:string) {
    this.viewChangeSubject.next(data);
  }

}
