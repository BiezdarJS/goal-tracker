import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
// Types
import { IGoal } from 'src/app/interfaces/goal.interface';
// Enums
import { GoalsViewType } from 'src/app/enums/goals.view-type';
// Services
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { CalendarGoalsService } from 'src/app/services/calendar/calendar-goals.service';
import { CalendarNotificationService } from 'src/app/services/calendar/calendar-notification.service';
import { GoalsNotificationsService } from 'src/app/services/goals/goals-notifications.service';
// Interfaces
import { IGoalsGrid } from '../../../models/calendar.model';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { Subscription } from 'rxjs';



dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
  selector: 'gt-goals-grid',
  templateUrl: './goals-grid.component.html',
  styleUrls: ['./goals-grid.component.scss']
})
export class GoalsGridComponent implements OnInit, AfterViewInit, OnDestroy {


  public loading$: boolean = true;
  public imagesURL: string = '';

  firstYearMonths!: any;
  secondYearMonths!: any;
  monthNames = this.calendarTasksService.monthNames;
  selectedMonth:any;
  calendar!: IGoalsGrid;
  monthsCollection!: any;
  allGoals: Array<IGoal> = [];

  objectValues = Object.values;
  goalsViewType!:string;
  public get GoalsViewType() {
    return GoalsViewType;
  }
  // Values for goal filter
  selectCategoryValue!: string;
  selectDateValue!: string;
  // Subscriptions
  subscr1!:Subscription;
  subscr2!:Subscription;
  subscr3!:Subscription;


  constructor(
    private globalVars: GlobalVariablesService,
    private elementRef: ElementRef,
    private calendarTasksService: CalendarGoalsService,
    private goalsService: GoalsService,
    private goalsNotificationsS: GoalsNotificationsService,
    private calendarNotificationS: CalendarNotificationService,
  ) {}

  ngOnInit():void {
    // Subscribe to Change View Notification
    this.subscr1 = this.goalsNotificationsS.activeGoalsViewType.subscribe(d => {
      this.goalsViewType = d;
    });
    // Subscribe to Filter Button Event
    this.subscr2 = this.goalsNotificationsS.categoryValue.subscribe(d => {
      this.selectCategoryValue = d;
    });
    // Subscribe to Filter Button Event
    this.subscr3 = this.goalsNotificationsS.dateValue.subscribe(d => {
      this.selectDateValue = d;
    });
    // Settings
    this.imagesURL = this.globalVars.imagesURL;
    // Fetch Goals
    setTimeout(() => {
      this.goalsService.fetchGoalsWithFilter(this.selectCategoryValue,this.selectDateValue)
        .subscribe((goals:any) => {
          this.allGoals = goals;
          this.loading$ = false;
        })
    }, 550);

  }


  ngAfterViewInit(): void {

  }




  ngOnDestroy():void {
    // this.loading$ = false;
    this.subscr1.unsubscribe();
    this.subscr2.unsubscribe();
    this.subscr3.unsubscribe();
  }





}
