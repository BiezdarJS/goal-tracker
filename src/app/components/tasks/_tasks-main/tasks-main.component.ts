import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
// Components
import { CalendarTypeDayComponent } from '../calendar-type-day/calendar-type-day.component';
import { CalendarTypeWeekComponent } from '../calendar-type-week/calendar-type-week.component';
import { CalendarTypeMonthComponent } from '../calendar-type-month/calendar-type-month.component';
// Services
import { CalendarService } from 'src/app/services/calendar.service';
// Directives
import { NewTaskDirective } from 'src/app/directives/tasks/new-task.directive';
import { TasksService } from 'src/app/services/tasks.service';
import { NewTaskComponent } from '../new-task/new-task.component';





@Component({
  selector: 'gt-tasks-main',
  templateUrl: './tasks-main.component.html',
  host: { 'class' : 'tasks-main'},
  styleUrls: ['./tasks-main.component.scss']
})
export class TasksMainComponent {

  @ViewChild(NewTaskDirective, {read: ViewContainerRef, static:true})
  tasksHost!: ViewContainerRef;
  @ViewChild(NewTaskDirective, {read: ViewContainerRef, static:true})
  newTaskHost!: ViewContainerRef;

  WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  value: boolean = false;
  currentCalendarType!: string;


  constructor(
    private calendarService: CalendarService,
    private tasksService: TasksService
  ) {}


  ngOnInit() {
    this.currentCalendarType = this.calendarService.currentCalendarType;
    if (this.currentCalendarType === 'day') {
      this.tasksHost.createComponent(CalendarTypeDayComponent);
    }
    if (this.currentCalendarType === 'week') {
      this.tasksHost.createComponent(CalendarTypeWeekComponent);
    }
    if (this.currentCalendarType === 'month') {
      this.tasksHost.createComponent(CalendarTypeMonthComponent);
    }
  }

  ngDoCheck() {
    this.currentCalendarType = this.calendarService.currentCalendarType;
  }



  createNewTask() {
    this.newTaskHost.createComponent(NewTaskComponent);
  }

  removeNewTask() {
    this.newTaskHost.remove();
    this.tasksService.components = [];
  }


  refreshTasksGrid() {
    // console.log(this.goalsGridHost);
    // pobierz wartoś z
    this.tasksHost.remove();
    setTimeout(() => {
      if (this.currentCalendarType === 'day') {
        this.tasksHost.createComponent(CalendarTypeDayComponent);
      }
      if (this.currentCalendarType === 'week') {
        this.tasksHost.createComponent(CalendarTypeWeekComponent);
      }
      if (this.currentCalendarType === 'month') {
        this.tasksHost.createComponent(CalendarTypeMonthComponent);
      }

    },50);
  }

}
