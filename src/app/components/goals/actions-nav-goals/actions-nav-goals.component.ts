import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { GoalsCalendarService } from 'src/app/services/goals-calendar.service';
// select
declare function Select(): void;

@Component({
  selector: 'gt-actions-nav-goals',
  templateUrl: './actions-nav-goals.component.html',
  host: { 'class': 'actions-nav'},
  styleUrls: ['./actions-nav-goals.component.scss']
})
export class ActionsNavGoalsComponent implements AfterViewInit {

  @ViewChild('select_area') select_area!: ElementRef;
  @ViewChild('select_time') select_time!: ElementRef;
  // Emit New Goal Event
  @Output() goalEvent = new EventEmitter();
  emitNewGoalEvent() {
    console.log('test');
    this.goalEvent.emit();
  }

  constructor(
    private goalsCalendarService: GoalsCalendarService
  ) {}


  ngAfterViewInit():void {
    new (Select as any)(this.select_area.nativeElement, {
      placeholder: 'All',
      textBefore: "Show: "
    });
    new (Select as any)(this.select_time.nativeElement, {
      placeholder: 'Creation Date',
      textBefore: "Sort By: "
    });
  }


  triggerPrevBtn() {
    this.goalsCalendarService.previousBtnHandler();
  }

  triggerNextBtn() {
    this.goalsCalendarService.nextBtnHandler();
  }


}
