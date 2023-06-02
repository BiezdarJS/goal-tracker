import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, OnDestroy, TemplateRef } from '@angular/core';
// Interfaces
import { ICalendarDaysExtended, ICalendarExtended } from '../../../models/calendar.model';
// Services
import { CalendarService } from 'src/app/services/calendar.service';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';



dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
  selector: 'gt-calendar-type-week',
  templateUrl: './calendar-type-week.component.html',
  host: {'class': 'calendar-grid calendar-grid--week'},
  styleUrls: ['./calendar-type-week.component.scss']
})
export class CalendarTypeWeekComponent implements AfterViewInit, AfterContentInit, OnDestroy {


  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
  firstMonthDays!: any;
  secondMonthDays!: any;
  selectedMonth:any;
  calendar!: ICalendarExtended;
  currentDaysArray: any;


  constructor(
    private elementRef:ElementRef,
    private calendarService: CalendarService
  ) {}




  ngAfterViewInit(): void {
    this.calendar = {
      year: this.calendarService.selectedMonth.format("YYYY"),
      month: this.calendarService.selectedMonth.format("M"),
      first_day: parseInt(this.calendarService.selectedMonth.format("D"), 10)
    }
    this.currentDaysArray = this.createCalendar(this.calendar);
  }


  ngAfterContentInit():void {
    this.calendar = {
      year: this.calendarService.selectedMonth.format("YYYY"),
      month: this.calendarService.selectedMonth.format("M"),
      first_day: parseInt(this.calendarService.selectedMonth.format("D"), 10)
    }
    this.currentDaysArray = this.createCalendar(this.calendar);
  }


  createCalendar(calendar: ICalendarExtended) {

    this.removeAllDayElements(this.elementRef.nativeElement);

    this.firstMonthDays = this.createFirstMonthDays(this.calendar);

    this.secondMonthDays = this.createSecondMonthDays(this.calendar);

    const days = [...this.firstMonthDays, ...this.secondMonthDays];

    return days;
  }


  createFirstMonthDays(calendar: ICalendarExtended) {

    const monthOfTheFirstDay = dayjs(`${calendar.year}-${calendar.month}-${calendar.first_day}`).month() + 1;

    const numberOfDaysInFirstMonth = this.getNumberOfDaysInMonth(calendar.year,monthOfTheFirstDay);

    let visibleNumberOfDaysFromFirstMonth = numberOfDaysInFirstMonth - calendar.first_day + 1;
    visibleNumberOfDaysFromFirstMonth = visibleNumberOfDaysFromFirstMonth <= 7 ? visibleNumberOfDaysFromFirstMonth : 0;


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


  createSecondMonthDays(calendar: ICalendarExtended) {

    const monthOfTheFirstDay = dayjs(`${calendar.year}-${calendar.month}-${calendar.first_day}`).month() + 1;

    const numberOfDaysInFirstMonth = this.getNumberOfDaysInMonth(calendar.year,monthOfTheFirstDay);

    let visibleNumberOfDaysFromFirstMonth = numberOfDaysInFirstMonth - calendar.first_day + 1;
    visibleNumberOfDaysFromFirstMonth = visibleNumberOfDaysFromFirstMonth <= 7 ? visibleNumberOfDaysFromFirstMonth : 0;

    let numberOfSecondMonthDays = 7 - visibleNumberOfDaysFromFirstMonth;

    let first_day = dayjs(`${calendar.year}-${calendar.month}-${calendar.first_day}`).add(visibleNumberOfDaysFromFirstMonth, "day");
    let first_day_of_second_month = dayjs(first_day).date();

    let month = visibleNumberOfDaysFromFirstMonth > 0 ? parseInt(calendar.month,10) + 1 : calendar.month;

    return [...Array(numberOfSecondMonthDays)].map((day, index) => {
      const secondMonthDays: ICalendarDaysExtended = {
        date: dayjs(`${calendar.year}-${month}-${first_day_of_second_month + index}`).format("YYYY-MM-DD"),
        dayOfMonth: first_day_of_second_month + index,
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
    this.elementRef.nativeElement.remove();
  }

}
