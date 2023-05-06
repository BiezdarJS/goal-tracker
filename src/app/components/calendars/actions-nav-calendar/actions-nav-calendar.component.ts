import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
@Component({
  selector: 'gt-actions-nav-calendar',
  templateUrl: './actions-nav-calendar.component.html',
  host: { 'class': 'actions-nav actions-nav--calendar'},
  styleUrls: ['./actions-nav-calendar.component.scss']
})

export class ActionsNavCalendarComponent {

  @Output() prevBtnEvent = new EventEmitter();

  test!: string;



  constructor(
    private calendarService: CalendarService
  ) { }


  triggerPrevBtn() {
    this.calendarService.previousBtnHandler();
  }


  // value = this.calendarService.observable.subscribe(isActive => this.test = isActive);



  switchCalendarType(event:Event) {
    const calendarType = (event.target as HTMLButtonElement).getAttribute('data-calendar-type');
    this.calendarService.currentCalendarType = calendarType!;
    this.calendarService.switchCalendarType(calendarType!);
  }


}
