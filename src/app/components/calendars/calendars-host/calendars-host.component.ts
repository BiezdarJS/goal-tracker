import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { CalendarType } from '../../../models/calendar.model';
import { CalendarService } from 'src/app/services/calendar.service';
import {Subject} from 'rxjs';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
  selector: 'gt-calendars-host',
  templateUrl: './calendars-host.component.html',
  styleUrls: ['./calendars-host.component.scss']
})
export class CalendarsHostComponent implements OnInit, DoCheck {

  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  ngDoCheck() {
    this.currentCalendarType = this.calendarService.currentCalendarType;
  }


  value: boolean = false;
  childNotifier : Subject<boolean> = new Subject<boolean>

  currentCalendarType!: string;

  constructor(
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.currentCalendarType = this.calendarService.currentCalendarType;
  }




}
