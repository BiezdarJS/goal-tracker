import { Injectable } from '@angular/core';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { Goal } from '../../types/goal.type';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Injectable({
  providedIn: 'root'
})
export class CalendarGoalsService {

    // CALENDAR
    INITIAL_YEAR = dayjs().format("YYYY");
    INITIAL_MONTH = dayjs().format("M");
    selectedMonth = dayjs(`${this.INITIAL_YEAR}-${this.INITIAL_MONTH}-01`);
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor() { }

    // CALENDAR
    previousBtnHandler() {
      this.selectedMonth = dayjs(this.selectedMonth).subtract(3, "month");

    }
    nextBtnHandler() {
      this.selectedMonth = dayjs(this.selectedMonth).add(3, "month");
    }
}
