import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
// Types
import { Goal } from 'src/app/types/goal.type';
// Enums
import { GoalsViewType } from 'src/app/enums/goals.view-type';
// Services
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { CalendarNotificationService } from 'src/app/services/calendar/calendar-notification.service';
import { GoalsNotificationsService } from 'src/app/services/goals/goals-notifications.service';
// Interfaces
import { IGoalsGrid, ICalendarMonths } from '../../../models/calendar.model';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { GoalsMainComponent } from '../_goals-main/goals-main.component';
import { map } from 'rxjs';




dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
  selector: 'gt-goals-grid',
  templateUrl: './goals-grid.component.html',
  host: {'class': 'goals-grid'},
  styleUrls: ['./goals-grid.component.scss']
})
export class GoalsGridComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {


  public loading$!: boolean;
  public imagesURL: string = '';

  firstYearMonths!: any;
  secondYearMonths!: any;
  monthNames = this.goalsService.monthNames;
  selectedMonth:any;
  calendar!: IGoalsGrid;
  monthsCollection!: any;
  allGoals: Array<Goal> = [];
  // select values
  selectCategoryValue!: string;
  selectDateValue = 'all';
  objectValues = Object.values;
  goalsViewType!:string;
  public get GoalsViewType() {
    return GoalsViewType;
  }
  switcherBtnHasBeenFired!:boolean;

  constructor(
    private globalVars: GlobalVariablesService,
    private elementRef: ElementRef,
    private goalsService: GoalsService,
    private goalsNotificationsS: GoalsNotificationsService,
    private calendarNotificationS: CalendarNotificationService
  ) {}

  ngOnInit():void {
    // Subscribe to Change View Notification
    this.goalsNotificationsS.activeGoalsViewType.subscribe(d => {
      this.goalsViewType = d;
    });
    // Subscribe to Swticher Button Event
    this.calendarNotificationS.switcherBtnHasBeenFired.subscribe(d => {
      this.switcherBtnHasBeenFired = d;
    });
    // Settings
    this.loading$ = false;
    this.imagesURL = this.globalVars.imagesURL;
  }


  ngAfterViewInit(): void {
    this.loading$ = true;
    // Collect Goals Grid Data
    this.calendar = {
      year: this.goalsService.selectedMonth.format("YYYY"),
      month: this.goalsService.selectedMonth.format("M"),
      first_month: parseInt(this.goalsService.selectedMonth.format("M"), 10)
    }
    this.monthsCollection = this.collectMonths(this.calendar);
    setTimeout(() => {
        this.goalsService.filter(this.selectCategoryValue,this.selectDateValue)
        .subscribe((goals:any) => {
          this.allGoals = goals;
          this.loading$ = false;
        })
    }, 550);
  }


   ngAfterViewChecked():void {
    if (this.switcherBtnHasBeenFired === true) {
      // Collect Goals Grid Data
      this.calendar = {
        year: this.goalsService.selectedMonth.format("YYYY"),
        month: this.goalsService.selectedMonth.format("M"),
        first_month: parseInt(this.goalsService.selectedMonth.format("M"), 10)
      }
      this.monthsCollection = this.collectMonths(this.calendar);
      // Send notification to Service to prevent further execution of this code
      this.calendarNotificationS.sendNotification(false);
    }
  }





  ngOnDestroy():void {
    // this.loading$ = false;
  }




  // Methods beneath are responsible for generating the Calendar


  collectMonths(calendar: IGoalsGrid) {

    this.removeAllMonthElements(this.elementRef.nativeElement);

    this.firstYearMonths = this.createFirstYearMonths(calendar);
    this.secondYearMonths = this.createSecondYearMonths(calendar);
    const months = [...this.firstYearMonths, ...this.secondYearMonths];

    return months;

  }

  createFirstYearMonths(calendar:IGoalsGrid) {

    let visibleNumberOfMonthsFromFirstYear = 11 - calendar.first_month;
    visibleNumberOfMonthsFromFirstYear = visibleNumberOfMonthsFromFirstYear <= 3 ? visibleNumberOfMonthsFromFirstYear : 0;


    return [...Array(visibleNumberOfMonthsFromFirstYear)].map((month, index) => {
        const firstYearMonths: ICalendarMonths = {
        date: dayjs(
          `${calendar.year}-${calendar.month}-${calendar.first_month+index}`
        ).format("YYYY-MM-DD"),
        monthOfTheYear: dayjs(`${calendar.year}-${parseInt(calendar.month,10)+index}-1`).month(),
      };
      return firstYearMonths;
    });
  }


  createSecondYearMonths(calendar:IGoalsGrid) {

    let visibleNumberOfMonthsFromFirstYear = 11 - calendar.first_month;
    visibleNumberOfMonthsFromFirstYear = visibleNumberOfMonthsFromFirstYear <= 3 ? visibleNumberOfMonthsFromFirstYear : 0;

    let numberOfSecondYearMonths = 3 - visibleNumberOfMonthsFromFirstYear;

    let first_month = dayjs(`${calendar.year}-${calendar.month}-1`).add(visibleNumberOfMonthsFromFirstYear, "month");
    // first_month = ;
    let first_month_of_second_year = dayjs(first_month).month();


    let month = visibleNumberOfMonthsFromFirstYear > 0 ? parseInt(calendar.month,10) + 1 : calendar.month;

    return [...Array(numberOfSecondYearMonths)].map((day, index) => {
      const secondYearMonths: ICalendarMonths = {
        date: dayjs(`${calendar.year}-${parseInt(calendar.month,10)+index}-1`).format("YYYY-MM-DD"),
        monthOfTheYear: dayjs(`${calendar.year}-${parseInt(calendar.month,10)+index}-1`).month(),
      };
      return secondYearMonths;
    });
  }


  getNumberOfDaysInMonth(year:any, month:any) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  }


  removeAllMonthElements(goalsGrid:any) {
    let first = goalsGrid.firstElementChild;
    while (first) {
      first.remove();
      first = goalsGrid.firstElementChild;
    }
  }



}
