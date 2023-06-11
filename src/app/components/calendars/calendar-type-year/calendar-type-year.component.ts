import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, ElementRef, OnInit, TemplateRef } from '@angular/core';
// Types
import { Goal } from 'src/app/types/goal.type';
// Enums
import { GoalsViewType } from 'src/app/enums/goals.view-type';
// Services
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { CalendarGoalsService } from 'src/app/services/calendar/calendar-goals.service';
import { CalendarNotificationService } from 'src/app/services/calendar/calendar-notification.service';
import { GoalsNotificationsService } from 'src/app/services/goals/goals-notifications.service';
// Interfaces
import { IGoalsGrid, ICalendarMonths, ICalendar } from '../../../models/calendar.model';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { GoalsMainComponent } from '../../goals/_goals-main/goals-main.component';
import { map } from 'rxjs';



@Component({
  selector: 'gt-calendar-type-year',
  templateUrl: './calendar-type-year.component.html',
  host: {'class': 'calendar-grid calendar-grid--day'},
  styleUrls: ['./calendar-type-year.component.scss']
})
export class CalendarTypeYearComponent implements OnInit, AfterContentChecked, AfterContentInit {

  public loading$!: boolean;

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
  firstYearMonths!: any;
  secondYearMonths!: any;
  monthNames = this.calendarGoalsService.monthNames;
  selectedMonth:any;
  calendar!: ICalendar;
  currentMonthsArray: any;
  switcherBtnHasBeenFired!:boolean;
  filterBtnHasBeenFired!:boolean;
  // select values
  selectCategoryValue!: string;
  selectDateValue = 'all';
  allGoals: Array<Goal> = [];

  constructor(
    private globalVars: GlobalVariablesService,
    private elementRef: ElementRef,
    private calendarGoalsService: CalendarGoalsService,
    private goalsNotificationsS: GoalsNotificationsService,
    private calendarNotificationS: CalendarNotificationService,
  ) {}


  ngOnInit():void {
    // Subscribe to Swticher Button Event
    this.calendarNotificationS.switcherBtnHasBeenFired.subscribe(d => {
      this.switcherBtnHasBeenFired = d;
    });
    // Subscribe to Filter Button Event
    this.goalsNotificationsS.filterBtnHasBeenFired.subscribe(d => {
      this.filterBtnHasBeenFired = d;
    });
    // Settings
    this.loading$ = false;
  }


  ngAfterContentInit():void {
    this.calendar = {
      year: this.calendarGoalsService.selectedMonth.format("YYYY"),
      month: this.calendarGoalsService.selectedMonth.format("M")
    }
    // this.collectMonths(this.calendar);
    this.currentMonthsArray = this.collectMonths(this.calendar);
  }



   ngAfterContentChecked():void {
    if (this.switcherBtnHasBeenFired === true) {
      // Collect Goals Grid Data
      this.calendar = {
        year: this.calendarGoalsService.selectedMonth.format("YYYY"),
        month: this.calendarGoalsService.selectedMonth.format("M")
      }
      this.currentMonthsArray = this.collectMonths(this.calendar);
      // Send notification to Service to prevent further execution of this code
      this.calendarNotificationS.sendSwitcherBtnNotification(false);
    }
    if (this.filterBtnHasBeenFired === true) {
      this.goalsNotificationsS.sendFilterNotification(false);
    }
  }



  collectMonths(calendar: ICalendar) {

    this.removeAllMonthElements(this.elementRef.nativeElement);

    this.firstYearMonths = this.createFirstYearMonths(calendar);
    this.secondYearMonths = this.createSecondYearMonths(calendar);
    const months = [...this.firstYearMonths, ...this.secondYearMonths];

    return months;

  }

  createFirstYearMonths(calendar:ICalendar) {

    let visibleNumberOfMonthsFromFirstYear = 12 - parseInt(calendar.month,10);
    visibleNumberOfMonthsFromFirstYear = visibleNumberOfMonthsFromFirstYear <= 3 ? visibleNumberOfMonthsFromFirstYear : 0;

    return [...Array(visibleNumberOfMonthsFromFirstYear)].map((month, index) => {
        const firstYearMonths: ICalendarMonths = {
        date: dayjs(
          `${calendar.year}-${calendar.month}-${parseInt(calendar.month,10)+index}`
        ).format("YYYY-MM-DD"),
        monthOfTheYear: dayjs(`${calendar.year}-${parseInt(calendar.month,10)+index}-1`).month(),
      };
      return firstYearMonths;
    });
  }


  createSecondYearMonths(calendar:ICalendar) {

    let visibleNumberOfMonthsFromFirstYear = 12 - parseInt(calendar.month,10);
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
