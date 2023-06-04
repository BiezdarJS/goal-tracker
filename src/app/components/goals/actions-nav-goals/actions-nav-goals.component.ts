import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
// Services
import { CalendarNotificationService } from 'src/app/services/calendar/calendar-notification.service';
import { GoalsNotificationsService } from 'src/app/services/goals/goals-notifications.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
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
  @ViewChild('filter') filter123!:ElementRef;
  // Emit New Goal Event
  @Output() goalEvent = new EventEmitter();
  emitNewGoalEvent() {
    this.goalEvent.emit();
  }
  public loading$!: boolean;
  goalsViewType!:string;
  filterChanged!:boolean;

  constructor(
    private goalsService: GoalsService,
    private goalsNotificationsS: GoalsNotificationsService,
    private calendarNotificationS: CalendarNotificationService
  ) {}

  ngOnInit():void {
    // Change Filter Notification
    this.goalsNotificationsS.activeGoalsViewType.subscribe(d => {
      this.goalsViewType = d;
    });
    // Change View Notification
    this.goalsNotificationsS.filterChanged.subscribe(d => {
      this.filterChanged = d;
    });
  }

  ngAfterViewInit():void {
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
    if (this.filterChanged) {
      this.filter123.nativeElement.classList.add('highlight');
      setTimeout(() => {
        this.filter123.nativeElement.classList.remove('highlight');
        this.goalsNotificationsS.sendFilterNotification(false);
      },300);

    }
  }


  handlePrevBtn() {
    this.goalsService.previousBtnHandler();
    this.calendarNotificationS.sendNotification(true);
  }

  handleNextBtn() {
    this.goalsService.nextBtnHandler();
    this.calendarNotificationS.sendNotification(true);
  }

  switchGoalsView(data:any) {
    this.goalsNotificationsS.sendViewNotification(data);
  }

  triggerFilter() {
    this.loading$ = false;
    setTimeout(() => {
    this.goalsService.filter(this.select_category.nativeElement.value,this.select_date.nativeElement.value)
      .subscribe((goals:any) => {
        this.goalsService.allGoals = goals;

      });
      this.loading$ = false;
    }, 550);
  }

}
