import { ApplicationRef, ElementRef, EventEmitter, Injectable, Output, ViewContainerRef } from '@angular/core';
import { CalendarType } from '../components/calendars/calendar.model';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);




@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private output: ReplaySubject<string> = new ReplaySubject<string>(0);


  currentCalendarType: string = CalendarType.Day;
  INITIAL_YEAR = dayjs().format("YYYY");
  INITIAL_MONTH = dayjs().format("M");
  INITIAL_DAY = dayjs().format("D");
  selectedMonth = dayjs(`${this.INITIAL_YEAR}-${this.INITIAL_MONTH}-${this.INITIAL_DAY}`);

  constructor() {}



  switchCalendarType(calendarType:string) {
    this.currentCalendarType = calendarType;
    // this.subject.next(this.currentCalendarType);
    return this.currentCalendarType;
  }


  previousBtnHandler() {
    if (this.currentCalendarType === CalendarType.Week) {
      this.selectedMonth = dayjs(this.selectedMonth).subtract(7, "day");
    }
    if (this.currentCalendarType === CalendarType.Day) {
      this.selectedMonth = dayjs(this.selectedMonth).subtract(3, "day");
    }
  }




}
