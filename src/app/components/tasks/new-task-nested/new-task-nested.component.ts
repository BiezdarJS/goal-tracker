import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// Form
import { NgForm } from '@angular/forms';
// Services
import { GoalsNotificationsService } from 'src/app/services/goals/goals-notifications.service';

@Component({
  selector: 'gt-new-task-nested',
  templateUrl: './new-task-nested.component.html',
  host: { 'class': 'accordion__item'},
  styleUrls: ['./new-task-nested.component.scss']
})
export class NewTaskNestedComponent implements OnInit, AfterViewChecked {

  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLInputElement>;
  @Input() data: any;
  // New Goal
  newGoalSubmitTriggered!:boolean;

  constructor(
    private submitNotificationS: GoalsNotificationsService,
  ) {}


  ngOnInit():void {
    this.submitNotificationS.submitValue.subscribe(d => {
      this.newGoalSubmitTriggered = d;
    })
  }

  ngAfterViewChecked(): void {
    if (this.newGoalSubmitTriggered) {
      this.submitBtn.nativeElement.click();
      this.submitNotificationS.sendSubmitNotification(false);
    }

  }




  onSubmit(form:NgForm) {
    console.log(form);
  }


}
