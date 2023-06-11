import { AfterContentChecked, AfterContentInit, Component, ContentChild, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
// Interfaces
import { ICalendarDaysExtended, ICalendarExtendedWithDay } from '../../../models/calendar.model';
// Services
import { CalendarTasksService } from 'src/app/services/calendar/calendar-tasks.service';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { CalendarNotificationService } from 'src/app/services/calendar/calendar-notification.service';


dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
  selector: 'gt-calendar-type-day',
  templateUrl: './calendar-type-day.component.html',
  host: {'class': 'calendar-grid calendar-grid--day'},
  styleUrls: ['./calendar-type-day.component.scss']
})
export class CalendarTypeDayComponent implements OnInit, AfterContentInit, AfterContentChecked, OnDestroy {

  @Input() fired:any;
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
  firstMonthDays!: any;
  secondMonthDays!: any;
  selectedMonth:any;
  calendar!: ICalendarExtendedWithDay;
  currentDaysArray: any;
  switcherBtnHasBeenFired!:boolean;

  constructor(
    private elementRef: ElementRef,
    private calendarTasksService: CalendarTasksService,
    private calendarNotificationS: CalendarNotificationService

  ) {}

  ngOnInit():void {
    this.calendarNotificationS.switcherBtnHasBeenFired.subscribe(d => {
      this.switcherBtnHasBeenFired = d;
    });
  }

  ngAfterContentInit():void {
    this.calendar = {
      year: this.calendarTasksService.selectedMonth.format("YYYY"),
      month: this.calendarTasksService.selectedMonth.format("M"),
      first_day: parseInt(this.calendarTasksService.selectedMonth.format("D"), 10)
    }
    // this.createCalendar(this.calendar);
    this.currentDaysArray = this.createCalendar(this.calendar);
  }


  // do poprawy
  ngAfterContentChecked():void {
    if (this.switcherBtnHasBeenFired === true) {
      this.calendar = {
        year: this.calendarTasksService.selectedMonth.format("YYYY"),
        month: this.calendarTasksService.selectedMonth.format("M"),
        first_day: parseInt(this.calendarTasksService.selectedMonth.format("D"), 10)
      }
      this.currentDaysArray = this.createCalendar(this.calendar);
      // Send notification to Service to prevent refresh
      this.calendarNotificationS.sendSwitcherBtnNotification(false);
    }
  }



  createCalendar(calendar: ICalendarExtendedWithDay) {

    this.firstMonthDays = this.createFirstMonthDays(this.calendar);
    this.secondMonthDays = this.createSecondMonthDays(this.calendar);
    const days = [...this.firstMonthDays, ...this.secondMonthDays];

    return days;

  }


  createFirstMonthDays(calendar:ICalendarExtendedWithDay) {

    const monthOfTheFirstDay = dayjs(`${calendar.year}-${calendar.month}-${calendar.first_day}`).month() + 1;

    const numberOfDaysInFirstMonth = this.getNumberOfDaysInMonth(calendar.year,monthOfTheFirstDay);

    let visibleNumberOfDaysFromFirstMonth = numberOfDaysInFirstMonth - calendar.first_day + 1;
    visibleNumberOfDaysFromFirstMonth = visibleNumberOfDaysFromFirstMonth <= 3 ? visibleNumberOfDaysFromFirstMonth : 0;


    return [...Array(visibleNumberOfDaysFromFirstMonth)].map((day, index) => {
        const firstMonthDays: ICalendarDaysExtended = {
        date: dayjs(
          `${calendar.year}-${calendar.month}-${calendar.first_day+index}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: calendar.first_day + index,
        dayOfWeek: dayjs(`${calendar.year}-${calendar.month}-${calendar.first_day+index}`).day(),
        isCurrentMonth: false
      };
      return firstMonthDays;
    });
  }


  createSecondMonthDays(calendar:ICalendarExtendedWithDay) {

    const monthOfTheFirstDay = dayjs(`${calendar.year}-${calendar.month}-${calendar.first_day}`).month() + 1;

    const numberOfDaysInFirstMonth = this.getNumberOfDaysInMonth(calendar.year,monthOfTheFirstDay);

    let visibleNumberOfDaysFromFirstMonth = numberOfDaysInFirstMonth - calendar.first_day + 1;
    visibleNumberOfDaysFromFirstMonth = visibleNumberOfDaysFromFirstMonth <= 3 ? visibleNumberOfDaysFromFirstMonth : 0;


    let numberOfSecondMonthDays = 3 - visibleNumberOfDaysFromFirstMonth;

    let first_day = dayjs(`${calendar.year}-${calendar.month}-${calendar.first_day}`).add(visibleNumberOfDaysFromFirstMonth, "day");
    // first_day = ;
    let first_day_of_second_month = dayjs(first_day).date();


    let month = visibleNumberOfDaysFromFirstMonth > 0 ? parseInt(calendar.month,10) + 1 : calendar.month;

    return [...Array(numberOfSecondMonthDays)].map((day, index) => {
      const secondMonthDays: ICalendarDaysExtended = {
        date: dayjs(`${calendar.year}-${calendar.month}-${first_day_of_second_month + index}`).format("YYYY-MM-DD"),
        dayOfMonth: first_day_of_second_month+ index,
        dayOfWeek: dayjs(`${calendar.year}-${month}-${first_day_of_second_month+index}`).day(),
        isCurrentMonth: true
      };
      return secondMonthDays;
    });
  }


  getNumberOfDaysInMonth(year:any, month:any) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  }


  removeAllDayElements(calendarGrid:any) {
    let first = calendarGrid.firstElementChild;
    while (first) {
      first.remove();
      first = calendarGrid.firstElementChild;
    }
  }


  ngOnDestroy():void {
    // this.elementRef.nativeElement.remove();
    this.removeAllDayElements(this.elementRef.nativeElement);
  }

}
