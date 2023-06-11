import { Component, Input } from '@angular/core';

@Component({
  selector: 'gt-new-task-nested',
  templateUrl: './new-task-nested.component.html',
  host: { 'class': 'accordion__item'},
  styleUrls: ['./new-task-nested.component.scss']
})
export class NewTaskNestedComponent {
  @Input() data: any;
}
