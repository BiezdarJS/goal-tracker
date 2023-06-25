import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

// Components
import { GoalsMainComponent } from '../_goals-main/goals-main.component';
import { NewTaskNestedComponent } from '../../tasks/new-task-nested/new-task-nested.component';
// Directives
import { NewTaskDirective } from 'src/app/directives/tasks/new-task.directive';
// Services
import { GoalsService } from 'src/app/services/goals/goals.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { TasksNestedService } from 'src/app/services/tasks/tasks-nested.service';
import { GoalsNotificationsService } from 'src/app/services/goals/goals-notifications.service';
// Models
import { Goal } from 'src/app/models/goal.model';
import { Task } from 'src/app/models/task.model';
// Types
import { switchAll } from 'rxjs';
import { NgFor } from '@angular/common';





// Modal
declare function Modal(): void;
// Select
declare function Select(): void;

@Component({
  selector: 'gt-new-goal',
  templateUrl: './new-goal.component.html',
  host: {'class': 'modal__wrap'},
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./new-goal.component.scss']
})
export class NewGoalComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked {

  // Modal
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  // New Goal Form
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLInputElement>;
  @ViewChildren('newGoalStep') newGoalSteps!: QueryList<ElementRef>;
  @ViewChildren('progressBarStep') progressBarSteps!: QueryList<ElementRef>;
  @ViewChild('select_category') select_category!: ElementRef;
  // Task Priority
  @ViewChild('priority') priority!: ElementRef;
  // New Tasks
  @ViewChild('submitBtn2') submitBtn2!: ElementRef<HTMLInputElement>;
  @ViewChildren('accordion_item') accordion_items!: QueryList<ElementRef>;
  taskContainerRef!:any;
  // Event Emitters
  @Output('create') create = new EventEmitter();

  // goal Modal
  newGoalForm!:any;
  // New Goal Elements
  newGoalSubmitTriggered:boolean = false;
  newGoal!:any;
  newGoalId!:any;
  newTask!:any;
  btnBackIsActive: boolean = false;
  btnNextIsActive: boolean = false;
  btnCreateIsActive: boolean = false;


  constructor(
    private elRef: ElementRef,
    private parentRef: GoalsMainComponent,
    private goalsS: GoalsService,
    private tasksS: TasksService,
    private tasksNestedS: TasksNestedService,
    private submitNotificationS: GoalsNotificationsService,

  ) {}

  ngOnInit():void {
    // states
    this.btnBackIsActive = false;
    this.btnNextIsActive = true;
    this.btnCreateIsActive = false;
    // modal
    this.newGoalForm = new (Modal as any)({
      el: this.elRef.nativeElement,
      backdrop: 'static'
    });
    this.newGoalForm.show();

    // Submit Notification
    this.submitNotificationS.submitValue.subscribe(d => {
      this.newGoalSubmitTriggered = d;
    });

  }

  ngAfterViewInit():void {
    // Select
    new (Select as any)(this.select_category.nativeElement, {
      placeholder: 'Select Category...'
    });
    // Change detector
  }

  ngAfterViewChecked(): void {
    if (this.newGoalSubmitTriggered) {
      console.log('newGoalSubmitTrittred jest true');
      this.submitBtn.nativeElement.click();
      this.submitNotificationS.sendSubmitNotification(false);
    }

  }

  ngAfterContentChecked() {
    // if (this.newGoalSubmitTriggered) {
    //   this.submitBtn.nativeElement.click();
    //   this.submitNotificationS.sendNewGoalSubmitNotification(false);
    // }
  }

  closeModal() {
    this.newGoalForm.hide();
    setTimeout(() => {
      this.parentRef.removeNewGoal();
    },1000);
    // Reset Nested Task Service number
    this.tasksNestedS.number = 0;
    this.tasksNestedS.tasks = [];
  }

  handleBackAndNextBtn() {
    this.newGoalSteps.toArray().forEach((item, idx) => {
      if (item.nativeElement.classList.contains('active')) {
        // w tym momencie usuń z każdego done
        this.progressBarSteps.toArray().forEach(item => {
          item.nativeElement.classList.remove('done');
        });
        // dodaj done dla każdego z indexem równym i niższym do indeksu aktywnego kroku
        for (let i = 0; i <= idx; i++) {
          this.progressBarSteps.toArray()[i].nativeElement.classList.add('done');
        };
      }
    });
    // btn back
    if (!this.newGoalSteps.first.nativeElement.classList.contains('active')) {
      this.btnBackIsActive = true;
    } else {
      this.btnBackIsActive = false;
    }
    // btn next
    if (!this.newGoalSteps.last.nativeElement.classList.contains('active')) {
      this.btnNextIsActive = true;
      this.btnCreateIsActive = false;
    } else {
      this.btnNextIsActive = false;
      this.btnCreateIsActive = true;
    }
  }

  showNextStep(e:Event) {
    e.preventDefault();
    // handle modalSteps
    let results = this.newGoalSteps.toArray();
    let index: number;
    this.newGoalSteps.forEach((item, idx) => {
      if (item.nativeElement.classList.contains('active')) {
        index = idx === 2 ? -1 : idx;
      }
    });
    this.newGoalSteps.forEach(item => {
      item.nativeElement.classList.remove('active');
    });
    results.filter((el, idx) => idx === index + 1)[0].nativeElement.classList.add('active');
    // handle back and next btn
    this.handleBackAndNextBtn();
  }

  showPrevStep(e:Event) {
    e.preventDefault();
    // handle modalSteps
    let results = this.newGoalSteps.toArray();
    let index: number;
    this.newGoalSteps.forEach((item, idx) => {
      if (item.nativeElement.classList.contains('active')) {
        index = idx === -1 ? 2 : idx;
      }
    });
    this.newGoalSteps.forEach(item => {
      item.nativeElement.classList.remove('active');
    });
    results.filter((el, idx) => idx == index - 1)[0].nativeElement.classList.add('active');
    // handle back and next btn
    this.handleBackAndNextBtn();
  }

  get tasksNested() {
    return this.tasksNestedS.tasks;
  }

  // Handle New Task Component
  addNewTask() {
    this.tasksNestedS.number = this.tasksNestedS.number+1;
    this.tasksNestedS.tasks.push({
      goal_id: '',
      name: '',
      description: '',
      priority: '',
      taskDate: '',
      number: this.tasksNestedS.number
    })
  }


  triggerFormSubmit() {
    this.submitNotificationS.sendSubmitNotification(true);
  }

  // FORM
  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }
    // Post New Goal
    this.newGoal = new Goal(
      form.value.name,
      form.value.isMainGoal,
      form.value.details,
      form.value.select_category,
      form.value.creationDate,
      form.value.endDate
    );
    console.log(this.newGoal);
    this.goalsS.postGoal(this.newGoal).subscribe(response => { });
    // await this.goalsS.postGoal(this.newGoal).pipe(
    //   switchAll()
    // ).subscribe((newGoalId:any) => {
    //   // this.accordion_items.toArray().forEach(item => {

    //   //   console.log(item);
    //   // });
    //   // console.log(this.accordion_items);
    //   this.accordion_items.toArray().forEach(item => {
    //     form.value.taskPriority = this.priority.nativeElement.querySelector('.active').innerText;
    //     console.log(item);
    //     // this.newTask = new Task(
    //     //   newGoalId.name,
    //     //   form.value.taskName,
    //     //   form.value.taskDescription,
    //     //   form.value.taskPriority,
    //     //   form.value.taskDate,
    //     // );
    //     // this.tasksS.postTask(this.newTask);

    //   });
      // Remove New Goal Modal
      this.parentRef.removeNewGoal();
      // Refresh goals Grid
      this.parentRef.refreshGoalsGrid();

  }

  tasksFormSubmit(form:NgForm) {
    console.log(form);
  }


  // modalToggle(x:string) {
  //   this.modal.nativeElement.setAttribute('class', 'modal new-goal ' + x + '  animated');
  // };


}
