import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// Form
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
// Services
import { GoalsNotificationsService } from 'src/app/services/goals/goals-notifications.service';
import { GoalsService } from 'src/app/services/goals/goals.service';

@Component({
  selector: 'gt-new-task-nested',
  templateUrl: './new-task-nested.component.html',
  host: { 'class': 'accordion__item'},
  styleUrls: ['./new-task-nested.component.scss']
})
export class NewTaskNestedComponent implements OnInit, AfterViewChecked {

  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLInputElement>;
  @Output() formEvent = new EventEmitter();
  @Input() data: any;
  // New Goal Input
  @Input() goalId: any;
  // New Goal
  newGoalSubmitTriggered!:boolean;
  newGoalId!:any;
  // Priority Reference
  @ViewChild('priority') priority!: ElementRef;
  // Priority Value
  priorityValue!: string;


  constructor(
    private submitNotificationS: GoalsNotificationsService,
    private goalsS: GoalsService,
  ) {}


  ngOnInit():void {
    this.submitNotificationS.submitValue.subscribe(d => {
      this.newGoalSubmitTriggered = d;
    })

  }


  async ngAfterViewChecked() {
    if (this.newGoalSubmitTriggered) {
      await console.log(this.goalId);
      if (this.goalId) {
        this.submitBtn.nativeElement.click();
      }
    }

  }




  onSubmit(form:NgForm) {
    this.formEvent.emit(form);
  }


}
