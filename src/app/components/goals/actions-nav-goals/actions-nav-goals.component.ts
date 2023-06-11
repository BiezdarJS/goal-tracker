import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
// Services
import { CalendarNotificationService } from 'src/app/services/calendar/calendar-notification.service';
import { GoalsNotificationsService } from 'src/app/services/goals/goals-notifications.service';
import { CalendarGoalsService } from 'src/app/services/calendar/calendar-goals.service';
import { GoalsMainComponent } from '../_goals-main/goals-main.component';

// Select
declare function Select(): void;

@Component({
  selector: 'gt-actions-nav-goals',
  templateUrl: './actions-nav-goals.component.html',
  host: { 'class': 'actions-nav'},
  styleUrls: ['./actions-nav-goals.component.scss']
})
export class ActionsNavGoalsComponent implements AfterViewInit, AfterViewChecked {

  @ViewChild('select_category') select_category!: ElementRef;
  @ViewChild('select_date') select_date!: ElementRef;
  @ViewChild('filter') filterBtn!:ElementRef;
  // Emit New Goal Event
  @Output() goalEvent = new EventEmitter();
  emitNewGoalEvent() {
    this.goalEvent.emit();
  }
  goalsViewType!:string;
  goalsSelectChanged!:boolean;
  // current Year
  currentYear!:any;

  constructor(
    private calendarGoalsService: CalendarGoalsService,
    private goalsNotificationsS: GoalsNotificationsService,
    private calendarNotificationS: CalendarNotificationService,
    private parentRef: GoalsMainComponent
  ) {}

  ngOnInit():void {
    // Change Filter Notification
    this.goalsNotificationsS.activeGoalsViewType.subscribe(d => {
      this.goalsViewType = d;
    });
    // Change View Notification
    this.goalsNotificationsS.goalsSelectChanged.subscribe(d => {
      this.goalsSelectChanged = d;
    });
  }



  ngAfterViewInit():void {
    // Get Current Year
    this.currentYear = this.calendarGoalsService.selectedMonth.format("YYYY");
    // Initialize Select
    new (Select as any)(this.select_category.nativeElement, {
      placeholder: 'All',
      textBefore: "Show: "
    });
    new (Select as any)(this.select_date.nativeElement, {
      placeholder: 'Creation Date',
      textBefore: "Sort By: "
    });
  }

  ngAfterViewChecked():void {
    // Get Current Year
    this.currentYear = this.calendarGoalsService.selectedMonth.format("YYYY");
    // Check if select has been changed and perform action
    if (this.goalsSelectChanged) {
      this.filterBtn.nativeElement.classList.add('highlight');
      setTimeout(() => {
        this.filterBtn.nativeElement.classList.remove('highlight');
        this.goalsNotificationsS.sendGoalsSelectNotification(false);
      },300);
      this.goalsNotificationsS.sendCategoryNotification(this.select_category.nativeElement.value);
      this.goalsNotificationsS.sendDateNotification(this.select_date.nativeElement.value);
    }
  }


  handlePrevBtn() {
    this.calendarGoalsService.previousBtnHandler();
    this.calendarNotificationS.sendSwitcherBtnNotification(true);
  }

  handleNextBtn() {
    this.calendarGoalsService.nextBtnHandler();
    this.calendarNotificationS.sendSwitcherBtnNotification(true);
  }

  switchGoalsView(data:any) {
    this.goalsNotificationsS.sendViewNotification(data);
  }

  triggerFilter() {
    this.goalsNotificationsS.sendFilterNotification(true);
    this.parentRef.refreshGoalsGrid();
  }

}
