import { AfterContentInit, Component, ElementRef } from '@angular/core';
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
export class CalendarTypeWeekComponent implements AfterContentInit {



  firstMonthDays!: any;
  secondMonthDays!: any;
  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  selectedMonth:any;
  calendar!: ICalendarExtended;

  constructor(
    private elementRef:ElementRef,
    private calendarService: CalendarService
  ) {}




  ngAfterContentInit():void {
    this.calendar = {
      year: this.calendarService.selectedMonth.format("YYYY"),
      month: this.calendarService.selectedMonth.format("M"),
      first_day: parseInt(this.calendarService.selectedMonth.format("D"), 10)
    }
    this.createCalendar(this.calendar);
  }


  createCalendar(calendar: ICalendarExtended) {

    this.removeAllDayElements(this.elementRef.nativeElement);

    this.firstMonthDays = this.createFirstMonthDays(this.calendar);

    this.secondMonthDays = this.createSecondMonthDays(this.calendar);

    const days = [...this.firstMonthDays, ...this.secondMonthDays];

    days.forEach((day) => { this.appendDay(day, this.elementRef.nativeElement) });
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

  appendDay(day:any, calendarGrid:any) {

    const dayOfTheWeek = day.dayOfWeek-1 !== -1 ? day.dayOfWeek-1 : 6;

    const dayElement = `
      <div class="calendar-grid__column calendar-grid__column--week">
      <p class="calendar-grid__date title txt-center">
          ${this.WEEKDAYS[dayOfTheWeek] + ' ' + '<span>' + day.dayOfMonth + '</span>' }
      </p>
      <ul class="task-list list">
        <li class="task-list__item">
          <div class="task-item task-item--styling task-item--health-and-sports">
            <div class="task-item__content task-item__content--week">
              <h4 class="task-item__name">Warm up and run</h4>
            </div>
          </div>
        </li>
        <li class="task-list__item">
          <div class="task-item task-item--styling task-item--self-knowledge">
            <div class="task-item__content task-item__content--week">
              <h4 class="task-item__name">
                Complete task 2 week
              </h4>
            </div>
          </div>
        </li>
      </ul>
      </div>
    `;
    this.elementRef.nativeElement.innerHTML += dayElement;

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


  // previousWeekSelector() {
  //   this.selectedMonth = dayjs(this.selectedMonth).subtract(7, "day");
  //   this.createCalendar(this.calendar);
  // }

  // nextWeekSelector() {
  //   this.selectedMonth = dayjs(this.selectedMonth).add(7, "day");
  //   this.createCalendar(this.selectedMonth.format("YYYY"), this.selectedMonth.format("M"), this.selectedMonth.format("D"));
  // }



}
