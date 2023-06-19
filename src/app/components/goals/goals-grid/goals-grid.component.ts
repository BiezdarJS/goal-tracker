import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
// Types
import { Goal } from 'src/app/types/goal.type';
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



dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
  selector: 'gt-goals-grid',
  templateUrl: './goals-grid.component.html',
  styleUrls: ['./goals-grid.component.scss']
})
export class GoalsGridComponent implements OnInit, AfterViewInit, OnDestroy {


  public loading$!: boolean;
  public imagesURL: string = '';

  firstYearMonths!: any;
  secondYearMonths!: any;
  monthNames = this.calendarTasksService.monthNames;
  selectedMonth:any;
  calendar!: IGoalsGrid;
  monthsCollection!: any;
  allGoals: Array<Goal> = [];

  objectValues = Object.values;
  goalsViewType!:string;
  public get GoalsViewType() {
    return GoalsViewType;
  }
  // Values for goal filter
  selectCategoryValue!: string;
  selectDateValue!: string;


  constructor(
    private globalVars: GlobalVariablesService,
    private elementRef: ElementRef,
    private calendarTasksService: CalendarGoalsService,
    private goalsService: GoalsService,
    private goalsNotificationsS: GoalsNotificationsService,
    private calendarNotificationS: CalendarNotificationService
  ) {}

  ngOnInit():void {
    // Subscribe to Change View Notification
    this.goalsNotificationsS.activeGoalsViewType.subscribe(d => {
      this.goalsViewType = d;
    });
    // Subscribe to Filter Button Event
    this.goalsNotificationsS.categoryValue.subscribe(d => {
      this.selectCategoryValue = d;
    });
    // Subscribe to Filter Button Event
    this.goalsNotificationsS.dateValue.subscribe(d => {
      this.selectDateValue = d;
    });
    // Settings
    this.imagesURL = this.globalVars.imagesURL;
    this.loading$ = true;
  }


  ngAfterViewInit(): void {
    // Fetch Goals
    setTimeout(() => {
      this.goalsService.fetchGoalsWithFilter(this.selectCategoryValue,this.selectDateValue)
        .subscribe((tasks:any) => {
          this.allGoals = tasks;
          this.loading$ = false;
        })
    }, 550);
  }




  ngOnDestroy():void {
    // this.loading$ = false;
  }





}
