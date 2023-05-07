import { AfterContentChecked, AfterContentInit, Component, ElementRef } from '@angular/core';
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
  selector: 'gt-calendar-type-day',
  templateUrl: './calendar-type-day.component.html',
  host: {'class': 'calendar-grid calendar-grid--day'},
  styleUrls: ['./calendar-type-day.component.scss']
})
export class CalendarTypeDayComponent implements AfterContentInit, AfterContentChecked {

  firstMonthDays!: any;
  secondMonthDays!: any;
  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  selectedMonth:any;
  calendar!: ICalendarExtended;
  checkSelectedDay:any;


  constructor(
    private elementRef: ElementRef,
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

  // do poprawy
  ngAfterContentChecked():void {
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

  appendDay(day:any, calendarGrid:any) {

    const dayOfTheWeek = day.dayOfWeek-1 !== -1 ? day.dayOfWeek-1 : 6;

    const dayElement = `
      <div class="calendar-grid__column calendar-grid__column--day">
      <p class="title txt-center">
        ${this.WEEKDAYS[dayOfTheWeek] + ' ' + '<span>' + day.dayOfMonth + '</span>' }
      </p>
      <ul class="task-list list">
        <li class="task-list__item task-list__item--styling">
          <div class="task-item task-item--styling task-item--health-and-sports task-item-1" draggable="true">
              <div class="task-item__additional-info">
                  <span></span>
                  <div class="hstack align-items-center">
                      <i class="icon icon--xsm icon--clock"></i>
                      <p class="ms-5">4 times a week</p>
                      <button class="btn btn--sm btn--no-style">
                          <i class="icon icon--medium-sm icon--edit"></i>
                      </button>
                  </div>
              </div>
              <div class="task-item__main">
                  <label class="checkbox checkbox--green">
                      <input class="checkbox__input" type="checkbox" name="">
                      <span class="checkbox__checkmark"></span>
                  </label>
                  <div class="task-item__content">
                      <h4 class="task-item__name subhead">
                          Warm up and run
                      </h4>
                      <p class="task-item__descr">
                          Distance 5km time 20min
                      </p>
                  </div>
              </div>
          </div>
        </li>
        <li class="task-list__item task-list__item--styling">
          <div class="task-item task-item--styling task-item--self-knowledge task-item-2" draggable="true">
              <div class="task-item__additional-info">
                  <span></span>
                  <div class="hstack align-items-center">
                      <i class="icon icon--xsm icon--clock"></i>
                      <p class="ms-5">Deadline until July 30</p>
                      <button class="btn btn--sm btn--no-style">
                          <i class="icon icon--medium-sm icon--edit"></i>
                      </button>
                  </div>
              </div>
              <div class="task-item__main">
                  <label class="checkbox checkbox--green">
                      <input class="checkbox__input" type="checkbox" name="">
                      <span class="checkbox__checkmark"></span>
                  </label>
                  <div class="task-item__content">
                      <h4 class="task-item__name subhead">
                          Complete task 2 week
                      </h4>
                      <p class="task-item__descr">
                          Visual Elements of User Interface Design
                      </p>
                  </div>
              </div>
          </div>
        </li>
      </ul>
      </div>
    `;
    calendarGrid.innerHTML += dayElement;

  }

  createFirstMonthDays(calendar:ICalendarExtended) {

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


  createSecondMonthDays(calendar:ICalendarExtended) {

    const monthOfTheFirstDay = dayjs(`${calendar.year}-${calendar.month}-${calendar.first_day}`).month() + 1;

    const numberOfDaysInFirstMonth = this.getNumberOfDaysInMonth(calendar.year,monthOfTheFirstDay);

    let visibleNumberOfDaysFromFirstMonth = numberOfDaysInFirstMonth - calendar.first_day + 1;
    visibleNumberOfDaysFromFirstMonth = visibleNumberOfDaysFromFirstMonth <= 3 ? visibleNumberOfDaysFromFirstMonth : 0;


    let numberOfSecondMonthDays = 3 - visibleNumberOfDaysFromFirstMonth;
    // console.log(numberOfSecondMonthDays);

    let first_day = dayjs(`${calendar.year}-${calendar.month}-${calendar.first_day}`).add(visibleNumberOfDaysFromFirstMonth, "day");
    // first_day = ;
    let first_day_of_second_month = dayjs(first_day).date();

    // console.log(first_day);

    let month = visibleNumberOfDaysFromFirstMonth > 0 ? parseInt(calendar.month,10) + 1 : calendar.month;

    return [...Array(numberOfSecondMonthDays)].map((day, index) => {
      const secondMonthDays: ICalendarDaysExtended = {
        date: dayjs(`${calendar.year}-${calendar.month}-${first_day_of_second_month + index}`).format("YYYY-MM-DD"),
        dayOfMonth: first_day_of_second_month+ index,
        dayOfWeek: dayjs(`${calendar.year}-${month}-${first_day_of_second_month+index}`).day(),
        isCurrentMonth: true
      };
      console.log(secondMonthDays);
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

}
