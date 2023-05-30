import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICalendarDays } from '../../../models/calendar.model';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);


@Component({
  selector: 'gt-calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html',
  host: {'class': 'calendar-month'},
  styleUrls: ['./calendar-dashboard.component.scss']
})
export class CalendarDashboardComponent implements OnInit {

  // Month Element
  @ViewChild('calendarDaysElement') calendarDaysElement!: ElementRef<HTMLOListElement>;


  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  TODAY = dayjs().format("YYYY-MM-DD");
  INITIAL_YEAR:any;
  INITIAL_MONTH:any;
  headerMonthAndYear: string = '';
  selectedMonth:any;
  currentMonthDays!: any;
  previousMonthDays!: any;
  nextMonthDays!: any;


  ngOnInit():void {
    this.INITIAL_YEAR = parseInt(dayjs().format("YYYY"), 10);
    this.INITIAL_MONTH = parseInt(dayjs().format("M"));
    this.selectedMonth = dayjs(new Date(this.INITIAL_YEAR, this.INITIAL_MONTH - 1, 1));
  }



  ngAfterViewInit() {
    this.createCalendar();
  }

  createCalendar(year = this.INITIAL_YEAR, month = this.INITIAL_MONTH) {
    // set header Month and Year
    this.headerMonthAndYear = dayjs(new Date(year, month - 1)).format("MMMM YYYY");
    // If exist, remove all Days
    const calendarDaysElement = this.calendarDaysElement.nativeElement;
    this.removeAllDayElements(calendarDaysElement);
    // Create Days
    this.currentMonthDays = this.createDaysForCurrentMonth(year,month);
    this.previousMonthDays = this.createDaysForPreviousMonth(year, month);
    this.nextMonthDays = this.createDaysForNextMonth(year, month);
    // Collect all Days
    const days = [...this.previousMonthDays, ...this.currentMonthDays, ...this.nextMonthDays];
    // Append All Days
    days.forEach(day => {
      this.appendDay(day, this.calendarDaysElement);
    });
  }

  createDaysForCurrentMonth(year:any, month:any) {
    return [...Array(this.getNumberOfDaysInMonth(year, month))].map((day, index) => {
      const currentMonthDays: ICalendarDays = {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true
      }
      return currentMonthDays;
    });
  }

  createDaysForPreviousMonth(year:any, month:any) {

    const firstDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[0].date);
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

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

  createDaysForNextMonth(year:any, month:any) {
    const lastDayOfTheMonthWeekday = this.getWeekday(
      `${year}-${month}-${this.currentMonthDays.length}`
    );

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

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

  appendDay(day:ICalendarDays, calendarDaysElement:any) {
    const tasks = `
    <li class="task-item-sm task-item-sm--self-knowledge">
    </li>
    <li class="task-item-sm task-item-sm--career">
    </li>
    `;
    const dayElement = document.createElement("li");
    const dayElementClassList = dayElement.classList;
    dayElementClassList.add("calendar-day");
    dayElementClassList.add("calendar-day--sm");
    const dayOfMonthElement = document.createElement("span");
    dayOfMonthElement.innerText = '' + day.dayOfMonth;
    dayElement.appendChild(dayOfMonthElement);
    const tasksListElement = document.createElement("ul");
    tasksListElement.classList.add('tasks-list', 'list', 'hstack', 'justify-content-center');
    tasksListElement.innerHTML = tasks;
    calendarDaysElement.nativeElement.appendChild(dayElement);
    if (day.dayOfMonth === 12) {
      dayElement.appendChild(tasksListElement);
    }
    if (!day.isCurrentMonth) {
      dayElementClassList.add("calendar-day--not-current");
    }

    if (day.date === this.TODAY) {
      dayElementClassList.add("calendar-day--today");
    }
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



  prevMonthSelector() {
    this.selectedMonth = dayjs(this.selectedMonth).subtract(1, "month");
    this.createCalendar(parseInt(this.selectedMonth.format("YYYY"),10), parseInt(this.selectedMonth.format("M"),10));
  }

  presentMonthSelector() {
    this.selectedMonth = dayjs(new Date(this.INITIAL_YEAR, this.INITIAL_MONTH - 1, 1));
    this.createCalendar(parseInt(this.selectedMonth.format("YYYY"),10), parseInt(this.selectedMonth.format("M"),10));
  }

  nextMontSelector() {
    this.selectedMonth = dayjs(this.selectedMonth).add(1, "month");
    this.createCalendar(parseInt(this.selectedMonth.format("YYYY"),10), parseInt(this.selectedMonth.format("M"),10));
  }


}
