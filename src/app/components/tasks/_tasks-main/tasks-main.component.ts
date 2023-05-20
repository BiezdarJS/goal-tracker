import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { TasksGridComponent } from '../tasks-grid/tasks-grid.component';
// Services
import { CalendarService } from 'src/app/services/calendar.service';
// Directives
import { NewTaskDirective } from 'src/app/directives/tasks/new-task.directive';
import { TasksService } from 'src/app/services/tasks.service';
import { NewTaskComponent } from '../new-task/new-task.component';




@Component({
  selector: 'gt-tasks-main',
  templateUrl: './tasks-main.component.html',
  styleUrls: ['./tasks-main.component.scss']
})
export class TasksMainComponent {

  @ViewChild(NewTaskDirective, {read: ViewContainerRef, static:true})
  gtNewTaskHost!: ViewContainerRef;

  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  value: boolean = false;
  currentCalendarType!: string;


  constructor(
    private calendarService: CalendarService,
    private tasksService: TasksService
  ) {}


  ngOnInit() {
    this.currentCalendarType = this.calendarService.currentCalendarType;
  }

  ngDoCheck() {
    this.currentCalendarType = this.calendarService.currentCalendarType;
  }


  createNewTask() {
    this.gtNewTaskHost.createComponent(NewTaskComponent);
  }

  removeNewTask() {
    this.gtNewTaskHost.remove();
    this.tasksService.components = [];
  }

  removeTasksGrid() {
    // console.log(this.goalsGridHost);
    // pobierz wartoś z
    this.gtNewTaskHost.remove();
    setTimeout(() => {
      this.gtNewTaskHost.createComponent(TasksGridComponent);
    },50);
  }

}
