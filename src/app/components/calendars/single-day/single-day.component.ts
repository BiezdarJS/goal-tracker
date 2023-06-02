import { Component, Input } from '@angular/core';

@Component({
  selector: 'gt-single-day',
  templateUrl: './single-day.component.html',
  host: { class: 'calendar-grid__column' },
  styleUrls: ['./single-day.component.scss']
})
export class SingleDayComponent {

  @Input() day!: any;

  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}
