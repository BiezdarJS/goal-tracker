import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
// Components
import { GoalsMainComponent } from '../_goals-main/goals-main.component';
import { NewTaskNestedComponent } from '../../tasks/new-task-nested/new-task-nested.component';
// Directives
import { NewTaskDirective } from 'src/app/directives/tasks/new-task.directive';
// Services
import { GoalsService } from 'src/app/services/goals/goals.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { TaskNestedService } from 'src/app/services/tasks/task-nested.service';
// Models
import { NewGoal } from 'src/app/models/new-goal.model';
import { NewTask } from 'src/app/models/new-task.model';
// Types
import { switchAll } from 'rxjs';

import { TaskNested } from 'src/app/types/task-nested.type';




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
export class NewGoalComponent implements OnInit, AfterViewInit {

  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLInputElement>;
  @ViewChildren('newGoalStep') newGoalSteps!: QueryList<ElementRef>;
  @ViewChildren('progressBarStep') progressBarSteps!: QueryList<ElementRef>;
  @ViewChild('select_category') select_category!: ElementRef;
  // Task Priority
  @ViewChild('priority') priority!: ElementRef;
  // Dynamic New Task Component
  @ViewChild(NewTaskDirective, {static: true}) newTaskHost!: NewTaskDirective;
  @ViewChildren('accordion_item') accordion_items!: QueryList<ElementRef>;
  taskContainerRef!:any;
  // Event Emitters
  @Output('create') create = new EventEmitter();

  // goal Modal
  newGoalForm!:any;
  // New Elements
  newGoal!:any;
  newGoalId!:any;
  newTask!:any;
  btnBackIsActive: boolean = false;
  btnNextIsActive: boolean = false;
  btnCreateIsActive: boolean = false;
  taskNested: TaskNested[] = [];

  constructor(
    private elRef: ElementRef,
    private parentRef: GoalsMainComponent,
    private goalsService: GoalsService,
    private tasksService: TasksService,
    private taskNestedService: TaskNestedService
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
    // Dynamic New Task Component
    this.taskContainerRef = this.newTaskHost.viewContainerRef;
  }

  ngAfterViewInit():void {
    // Select
    new (Select as any)(this.select_category.nativeElement, {
      placeholder: 'Select Category...'
    });
  }

  closeModal() {
    this.newGoalForm.hide();
    // Reset Nested Task Service number
    this.taskNestedService.number = 1;
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

  // Handle New Task Component
  addNewTask() {
    this.taskNestedService.number = this.taskNestedService.number+1;
    this.taskNested = this.taskNestedService.getTask();
    const componentRef = this.taskContainerRef.createComponent(this.taskNested[0].component);
    componentRef.instance.data = this.taskNested[0].data;
  }


  triggerFormSubmit(submitBtn: any) {
    this.submitBtn.nativeElement.click();
  }

  // FORM
  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // Post New Goal
    this.newGoal = new NewGoal(
      form.value.name,
      form.value.isMainGoal,
      form.value.details,
      form.value.select_category,
      form.value.lifeArea,
      form.value.creationDate,
      form.value.priority,
      form.value.endDate
    );
    await this.goalsService.postGoal(this.newGoal).pipe(
      switchAll()
    ).subscribe((newGoalId:any) => {
      // this.accordion_items.toArray().forEach(item => {

      //   console.log(item);
      // });
      console.log(this.accordion_items);
      // this.accordion_items.toArray().forEach(item => {
      //   // form.value.taskPriority = this.priority.nativeElement.querySelector('.active').innerText;

      //   // this.newTask = new NewTask(
      //   //   newGoalId.name,
      //   //   form.value.taskName,
      //   //   form.value.taskDescription,
      //   //   form.value.taskPriority,
      //   //   form.value.taskDate,
      //   // );
      //   // this.tasksService.postTask(this.newTask);

      // });
      // Remove New Goal Modal
      this.parentRef.removeNewGoal();
      // Refresh goals Grid
      this.parentRef.refreshGoalsGrid();
    })

  }




}
