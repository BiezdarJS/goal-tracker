import { Component, ElementRef, OnInit } from '@angular/core';
// New Goal
declare function Modal(): void;

@Component({
  selector: 'gt-new-goal',
  templateUrl: './new-goal.component.html',
  host: {'class': 'modal__wrap'},
  styleUrls: ['./new-goal.component.scss']
})
export class NewGoalComponent implements OnInit {

  newGoal:any;

  constructor(
    private elRef: ElementRef
  ) {}

  ngOnInit():void {
    this.newGoal = new (Modal as any)({
      el: this.elRef.nativeElement,
      backdrop: 'static'
    });
    this.newGoal.show();
  }

  closeModal() {
    this.newGoal.hide();
  }


}
