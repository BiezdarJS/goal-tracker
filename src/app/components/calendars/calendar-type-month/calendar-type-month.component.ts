import { AfterContentChecked, AfterContentInit, Component, ContentChild, ElementRef, OnDestroy, TemplateRef } from '@angular/core';
// Services
import { CalendarTasksService } from 'src/app/services/calendar/calendar-tasks.service';
import { CalendarNotificationService } from 'src/app/services/calendar/calendar-notification.service'
// Interfaces
import { ICalendar, ICalendarDays } from '../../../models/calendar.model';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
;


dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
  selector: 'gt-calendar-type-month',
  templateUrl: './calendar-type-month.component.html',
  host: {'class': 'calendar-grid'},
  styleUrls: ['./calendar-type-month.component.scss']
})

export class CalendarTypeMonthComponent implements AfterContentInit, AfterContentChecked, OnDestroy {

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
  calendar!: ICalendar;
  currentMonthDays: any;
  previousMonthDays: any;
  nextMonthDays: any;
  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  selectedMonth:any;
  calendarDaysElement = this.elementRef.nativeElement.querySelector('.days-grid');
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


  ngAfterContentInit(): void {
    this.calendar = {
      year: this.calendarTasksService.selectedMonth.format("YYYY"),
      month: this.calendarTasksService.selectedMonth.format("M")
    }
    this.currentDaysArray = this.createCalendar(this.calendar);
  }


  ngAfterContentChecked():void {
    if (this.switcherBtnHasBeenFired === true) {
      this.calendar = {
        year: this.calendarTasksService.selectedMonth.format("YYYY"),
        month: this.calendarTasksService.selectedMonth.format("M")
      }
      this.currentDaysArray = this.createCalendar(this.calendar);
      // Send notification to Service to prevent refresh
      this.calendarNotificationS.sendSwitcherBtnNotification(false);
    }
  }


  createCalendar(calendar: ICalendar) {
    // If exist, remove all Days
    const calendarDaysElement = this.elementRef.nativeElement.querySelector('.days-grid');
    this.removeAllDayElements(calendarDaysElement);
    // Create Days
    this.currentMonthDays = this.createDaysForCurrentMonth(calendar);
    this.previousMonthDays = this.createDaysForPreviousMonth(calendar);
    this.nextMonthDays = this.createDaysForNextMonth(calendar);
    // Collect all Days
    const days = [...this.previousMonthDays, ...this.currentMonthDays, ...this.nextMonthDays];
    // Append All Days
    return days;
  }

  createDaysForCurrentMonth(calendar: ICalendar) {
    return [...Array(this.getNumberOfDaysInMonth(calendar.year, calendar.month))].map((day, index) => {
      const currentMonthDays: ICalendarDays = {
        date: dayjs(`${calendar.year}-${calendar.month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true
      }
      return currentMonthDays;
    });
  }

  createDaysForPreviousMonth(calendar: ICalendar) {

    const firstDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[0].date);
    const previousMonth = dayjs(`${calendar.year}-${calendar.month}-01`).subtract(1, "month");

    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(this.currentMonthDays[0].date)
      .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
      .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
      const previousMonthDays: ICalendarDays = {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() + 1}-${
            previousMonthLastMondayDayOfMonth + index}`).format("YYYY-MM-DD"),
        dayOfMonth: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false
      }
      return previousMonthDays;
    });
  }

  createDaysForNextMonth(calendar: ICalendar) {
    const lastDayOfTheMonthWeekday = this.getWeekday(
      `${calendar.year}-${calendar.month}-${this.currentMonthDays.length}`
    );

    const nextMonth = dayjs(`${calendar.year}-${calendar.month}-01`).add(1, "month");

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      const nextMonthDays: ICalendarDays = {
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: false
      }
      return nextMonthDays;
    });
  }


  removeAllDayElements(calendarDaysElement:HTMLOListElement) {
    let first = calendarDaysElement.firstElementChild;

    while (first) {
      first.remove();
      first = calendarDaysElement.firstElementChild;
    }
  }

  getWeekday(date:any) {
    return dayjs(date).weekday();
  }

  getNumberOfDaysInMonth(year:any, month:any) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  }


  ngOnDestroy():void {
    this.elementRef.nativeElement.remove();
  }

}
