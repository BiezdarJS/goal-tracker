import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { GoalsService } from 'src/app/services/goals.service';
// select
declare function Select(): void;

@Component({
  selector: 'gt-actions-nav-goals',
  templateUrl: './actions-nav-goals.component.html',
  host: { 'class': 'actions-nav'},
  styleUrls: ['./actions-nav-goals.component.scss']
})
export class ActionsNavGoalsComponent implements AfterViewInit {

  @ViewChild('select_category') select_category!: ElementRef;
  @ViewChild('select_date') select_date!: ElementRef;
  // Emit New Goal Event
  @Output() goalEvent = new EventEmitter();
  emitNewGoalEvent() {
    this.goalEvent.emit();
  }

  constructor(
    private goalsService: GoalsService
  ) {}


  ngAfterViewInit():void {
    new (Select as any)(this.select_category.nativeElement, {
      placeholder: 'All',
      textBefore: "Show: "
    });
    new (Select as any)(this.select_date.nativeElement, {
      placeholder: 'Creation Date',
      textBefore: "Sort By: "
    });
  }


  triggerPrevBtn() {
    this.goalsService.previousBtnHandler();
  }

  triggerNextBtn() {
    this.goalsService.nextBtnHandler();
  }


}
