import { AfterViewInit, Component, ElementRef } from '@angular/core';
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
export class CalendarTypeWeekComponent implements AfterViewInit {

  firstMonthDays!: any;
  secondMonthDays!: any;
  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  INITIAL_YEAR = dayjs().format("YYYY");
  INITIAL_MONTH = dayjs().format("M");
  INITIAL_DAY = dayjs().format("D");
  selectedMonth = dayjs(`${this.INITIAL_YEAR}-${this.INITIAL_MONTH}-${this.INITIAL_DAY}`);

  constructor(
    private elementRef:ElementRef
  ) {}


  ngAfterViewInit() {
    this.createCalendar();
  }



  createCalendar(year = this.INITIAL_YEAR, month = this.INITIAL_MONTH, first_day = this.INITIAL_DAY) {

    this.removeAllDayElements(this.elementRef.nativeElement);

    this.firstMonthDays = this.createFirstMonthDays(year, month, first_day);

    this.secondMonthDays = this.createSecondMonthDays(year, month, first_day);

    const days = [...this.firstMonthDays, ...this.secondMonthDays];

    days.forEach((day) => { this.appendDay(day, this.elementRef.nativeElement) });
  }


  createFirstMonthDays(year:any,month:any,first_day:any) {

    const monthOfTheFirstDay = dayjs(`${year}-${month}-${first_day}`).month() + 1;

    const numberOfDaysInFirstMonth = this.getNumberOfDaysInMonth(year,monthOfTheFirstDay);

    let visibleNumberOfDaysFromFirstMonth = numberOfDaysInFirstMonth - first_day + 1;
    visibleNumberOfDaysFromFirstMonth = visibleNumberOfDaysFromFirstMonth <= 7 ? visibleNumberOfDaysFromFirstMonth : 0;


    return [...Array(visibleNumberOfDaysFromFirstMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${year}-${month}-${parseInt(first_day,10)+index}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: parseInt(first_day,10) + index,
        dayOfWeek: dayjs(`${year}-${month}-${parseInt(first_day,10)+index}`).day(),
        isCurrentMonth: false
      };
    });
  }


  createSecondMonthDays(year:any, month:any, first_day:any) {

    const monthOfTheFirstDay = dayjs(`${year}-${month}-${first_day}`).month() + 1;

    const numberOfDaysInFirstMonth = this.getNumberOfDaysInMonth(year,monthOfTheFirstDay);

    let visibleNumberOfDaysFromFirstMonth = numberOfDaysInFirstMonth - first_day + 1;
    visibleNumberOfDaysFromFirstMonth = visibleNumberOfDaysFromFirstMonth <= 7 ? visibleNumberOfDaysFromFirstMonth : 0;


    let numberOfSecondMonthDays = 7 - visibleNumberOfDaysFromFirstMonth;
    // console.log(numberOfSecondMonthDays);

    // do first_day trzeba dodać
    first_day = dayjs(`${year}-${month}-${first_day}`).add(visibleNumberOfDaysFromFirstMonth, "day");
    // console.log(dayjs(first_day).date());

    first_day = dayjs(first_day).date();
    // console.log(first_day);

    month = visibleNumberOfDaysFromFirstMonth > 0 ? parseInt(month,10) + 1 : month;

    return [...Array(numberOfSecondMonthDays)].map((day, index) => {
      return {
        date: dayjs(`${year}-${month}-${first_day + index}`).format("YYYY-MM-DD"),
        dayOfMonth: parseInt(first_day,10) + index,
        dayOfWeek: dayjs(`${year}-${month}-${parseInt(first_day,10)+index}`).day(),
        isCurrentMonth: true
      };
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


}
