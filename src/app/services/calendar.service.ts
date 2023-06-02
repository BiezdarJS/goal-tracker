import { Injectable } from '@angular/core';
import { CalendarType } from '../models/calendar.model';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);



@Injectable({
  providedIn: 'root'
})
export class CalendarService {


  currentCalendarType: string = CalendarType.Day;
  TODAY = dayjs().format("YYYY-MM-DD");
  INITIAL_YEAR = dayjs().format("YYYY");
  INITIAL_MONTH = dayjs().format("M");
  INITIAL_DAY = dayjs().format("D");
  selectedMonth = dayjs(`${this.INITIAL_YEAR}-${this.INITIAL_MONTH}-${this.INITIAL_DAY}`);



  switchCalendarType(calendarType:string):string {
    this.currentCalendarType = calendarType;
    return this.currentCalendarType;
  }


  previousBtnHandler() {
    if (this.currentCalendarType === CalendarType.Day) {
      this.selectedMonth = dayjs(this.selectedMonth).subtract(3, "day");
    }
    if (this.currentCalendarType === CalendarType.Week) {
      this.selectedMonth = dayjs(this.selectedMonth).subtract(7, "day");
    }
    if (this.currentCalendarType === CalendarType.Month) {
      this.selectedMonth = dayjs(this.selectedMonth).subtract(1, "month");
    }
  }

  nextBtnHandler() {
    if (this.currentCalendarType === CalendarType.Day) {
      this.selectedMonth = dayjs(this.selectedMonth).add(3, "day");
    }
    if (this.currentCalendarType === CalendarType.Week) {
      this.selectedMonth = dayjs(this.selectedMonth).add(7, "day");
    }
    if (this.currentCalendarType === CalendarType.Month) {
      this.selectedMonth = dayjs(this.selectedMonth).add(1, "month");
    }
  }




}
