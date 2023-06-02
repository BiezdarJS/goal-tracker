import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
// Components
import { TasksTypeDayComponent } from '../tasks-type-day/tasks-type-day.component';
import { TasksTypeWeekComponent } from '../tasks-type-week/tasks-type-week.component';
import { TasksTypeMonthComponent } from '../tasks-type-month/tasks-type-month.component';
// Models
import { CalendarType } from 'src/app/models/calendar.model';
// Services
import { CalendarService } from 'src/app/services/calendar.service';
// Directives
import { NewTaskDirective } from 'src/app/directives/tasks/new-task.directive';
import { TasksHostDirective } from 'src/app/directives/tasks/tasks-host.directive';
import { TasksService } from 'src/app/services/tasks.service';
import { NewTaskComponent } from '../new-task/new-task.component';





@Component({
  selector: 'gt-tasks-main',
  templateUrl: './tasks-main.component.html',
  host: { 'class' : 'tasks-main'},
  styleUrls: ['./tasks-main.component.scss']
})
export class TasksMainComponent {

  @ViewChild(TasksHostDirective, {static:true}) tasksHost!: TasksHostDirective;
  @ViewChild(NewTaskDirective, {static:true}) newTaskHost!: NewTaskDirective;


  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  value: boolean = false;
  currentCalendarType!: string;
  tasksContainerRef!: any;
  newTaskContainerRef!: any;

  constructor(
    private calendarService: CalendarService,
    private tasksService: TasksService,
  ) {

  }

  createTasks() {
    this.currentCalendarType = this.calendarService.currentCalendarType;
    this.tasksContainerRef.clear();
    if (this.currentCalendarType === CalendarType.Day) {
      this.tasksContainerRef.createComponent(TasksTypeDayComponent);
    }
    if (this.currentCalendarType === CalendarType.Week) {
      this.tasksContainerRef.createComponent(TasksTypeWeekComponent);
    }
    if (this.currentCalendarType === CalendarType.Month) {
      this.tasksContainerRef.createComponent(TasksTypeMonthComponent);
    }
  }


  ngOnInit() {
    this.tasksContainerRef = this.tasksHost.viewContainerRef;
    this.newTaskContainerRef = this.newTaskHost.viewContainerRef;
    this.createTasks();
  }

  ngDoCheck() {
    this.currentCalendarType = this.calendarService.currentCalendarType;
  }



  createNewTask() {
    this.newTaskContainerRef.createComponent(NewTaskComponent);
  }

  removeNewTask() {
    this.newTaskContainerRef.clear();
    this.tasksService.components = [];
  }


  refreshTasksGrid() {
    // pobierz wartoś z
    this.tasksContainerRef.clear();
    setTimeout(() => {
      if (this.currentCalendarType === CalendarType.Day) {
        this.tasksContainerRef.createComponent(TasksTypeDayComponent);
      }
      if (this.currentCalendarType === CalendarType.Week) {
        this.tasksContainerRef.createComponent(TasksTypeWeekComponent);
      }
      if (this.currentCalendarType === CalendarType.Month) {
        this.tasksContainerRef.createComponent(TasksTypeMonthComponent);
      }

    },50);
  }

}
