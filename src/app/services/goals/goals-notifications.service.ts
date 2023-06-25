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

  // Change Goals Select Notification
  public goalsSelectChangeSubject:BehaviorSubject<boolean> = new BehaviorSubject(false);
  goalsSelectChanged = this.goalsSelectChangeSubject.asObservable();

  sendGoalsSelectNotification(data:boolean) {
    this.goalsSelectChangeSubject.next(data);
  }



  // Change View Notification
  public viewChangeSubject: BehaviorSubject<string> = new BehaviorSubject('grid');
  activeGoalsViewType = this.viewChangeSubject.asObservable();

  sendViewNotification(data:string) {
    this.viewChangeSubject.next(data);
  }



  // Change Filter Notification
  public filterChangeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  filterBtnHasBeenFired = this.filterChangeSubject.asObservable();

  sendFilterNotification(data:any) {
    this.filterChangeSubject.next(data);
  }


  // Change Category Value Notification
  public categoryValueSubject: BehaviorSubject<string> = new BehaviorSubject('all');
  categoryValue = this.categoryValueSubject.asObservable();

  sendCategoryNotification(data:any) {
    this.categoryValueSubject.next(data);
  }


  // Change Date Value Notification
  public dateValueSubject: BehaviorSubject<string> = new BehaviorSubject('creation date');
  dateValue = this.dateValueSubject.asObservable();

  sendDateNotification(data:any) {
    this.dateValueSubject.next(data);
  }


  // New Goal Submit Notification
  public newGoalSubmitSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  submitValue = this.newGoalSubmitSubject.asObservable();

  sendSubmitNotification(data:boolean) {
    this.newGoalSubmitSubject.next(data);
  }

}
