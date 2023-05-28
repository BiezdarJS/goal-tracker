import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
// Services
import { TasksService } from 'src/app/services/tasks.service';
// New Task
import { NewTask } from 'src/app/models/new-task.model';
import { TasksMainComponent } from '../_tasks-main/tasks-main.component';

// Modal
declare function Modal(): void;

@Component({
  selector: 'gt-new-task',
  templateUrl: './new-task.component.html',
  host: {'class': 'modal__wrap'},
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit, AfterViewInit {

  @ViewChild('priority') priority!: ElementRef;
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLInputElement>;
  newTask:any;
  priorityValue!: any;

  constructor(
    private elRef: ElementRef,
    private parentRef: TasksMainComponent,
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
  }

  ngAfterViewInit():void {
    // this.priorityValue = this.priority.nativeElement.querySelector('.active').innerText;

  }



  triggerFormSubmit(submitBtn: any) {
    this.submitBtn.nativeElement.click();
  }

  // FORM
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.priorityValue = this.priority.nativeElement.querySelector('.active').innerText;

    this.tasksService.newTask = new NewTask(
      form.value.name,
      form.value.description,
      this.priorityValue,
      form.value.taskDate,
    );
    console.log(this.tasksService.newTask);

    this.tasksService.postTask();
    this.parentRef.removeNewTask();
    this.parentRef.refreshTasksGrid();
  }


}
