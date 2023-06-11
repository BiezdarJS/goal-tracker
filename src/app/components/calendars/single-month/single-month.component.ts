import { Component, Input } from '@angular/core';
import { CalendarGoalsService } from 'src/app/services/calendar/calendar-goals.service';

@Component({
  selector: 'gt-single-month',
  templateUrl: './single-month.component.html',
  host: { class: 'calendar-grid__column calendar-grid__column--day' },
  styleUrls: ['./single-month.component.scss']
})
export class SingleMonthComponent {

  @Input() month!: any;
  monthNames = this.calendarGoalsService.monthNames;

  constructor(
    private calendarGoalsService: CalendarGoalsService
  ) {}
}
