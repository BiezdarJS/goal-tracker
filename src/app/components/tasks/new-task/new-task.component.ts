import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
// Types
import { IGoal } from 'src/app/interfaces/goal.interface';
// Services
import { TasksService } from 'src/app/services/tasks/tasks.service';
// RxJS
import { map } from 'rxjs';
// New Task
import { Task } from 'src/app/models/task.model';
import { TasksMainComponent } from '../_tasks-main/tasks-main.component';
import { GoalsService } from 'src/app/services/goals/goals.service';
// Select
declare function Select(): void;
// Modal
declare function Modal(): void;

@Component({
  selector: 'gt-new-task',
  templateUrl: './new-task.component.html',
  host: {'class': 'modal__wrap'},
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  // @Input()
  // set ready(isReady: boolean) {
  //   if (isReady) this.makeSomething();
  // }
  @Output() taskCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  closeEventFn() {
        this.taskCloseEvent.emit(true)
  }
  @Output() taskSubmitEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  submitEventFn() {
        this.taskSubmitEvent.emit(true)
  }
  @ViewChildren('allTheseThings') things!: QueryList<any>;
  @ViewChild('select_goal') select_goal!: ElementRef;
  @ViewChild('priority') priority!: ElementRef;
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLInputElement>;
  allGoals: Array<any> = [];
  newTask:any;
  priorityValue!: any;

  constructor(
    private elRef: ElementRef,
    // private parentRef: TasksMainComponent,
    private goalsService: GoalsService,
    private tasksService: TasksService
  ) {}

  ngOnInit():void {
    // modal
    this.newTask = new (Modal as any)({
      el: this.elRef.nativeElement,
      backdrop: 'static'
    });
    this.newTask.show();

  }
  closeModal() {
    this.newTask.hide();
    this.closeEventFn();
  }

  ngAfterViewChecked():void {
    //Select
    // this.things.changes.subscribe(() => {
    // })
  }

  ngAfterViewInit():void {

    // Fetch Goals
    this.goalsService.fetchGoals()
    .pipe(
      map(response => {
        const goalsArray = [] as any;
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            goalsArray.push({ ...response[key], id: key })
          }
        }
        return goalsArray;
      }),
    ).subscribe(response => {
      this.allGoals = response;
    });
    this.things.changes.subscribe(() => {
      new (Select as any)(this.select_goal.nativeElement, {
        placeholder: 'Choose Goal...',
      });
    })
  }



  triggerFormSubmit(submitBtn: any) {
    this.submitBtn.nativeElement.click();
  }

  // FORM
  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }
    this.priorityValue = this.priority.nativeElement.querySelector('.active').innerText;

    this.newTask = new Task(
      form.value.goal_id,
      form.value.name,
      form.value.description,
      this.priorityValue,
      form.value.taskDate,
    );

    this.tasksService.postTask(this.newTask);
    this.submitEventFn();
  }


  ngOnDestroy():void {
    // this.parentRef.newTaskContainerRef.clear();
    this.elRef.nativeElement.remove();
  }




}
