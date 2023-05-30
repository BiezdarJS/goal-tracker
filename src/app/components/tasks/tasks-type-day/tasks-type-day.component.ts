import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/types/task.type';

@Component({
  selector: 'gt-tasks-type-day',
  templateUrl: './tasks-type-day.component.html',
  styleUrls: ['./tasks-type-day.component.scss']
})
export class TasksTypeDayComponent implements AfterViewInit {


  databaseContent: Array<Task> = [];
  objectValues = Object.values;
  dateFromChild!:string

  constructor(
    private tasksService: TasksService
  ) {}

  ngAfterViewInit(): void {
    // console.log(this.loading$);
    setTimeout(() => {

      this.tasksService.fetchTasks()
        .subscribe((tasks:any) => {
          this.databaseContent = tasks;

        })
    }, 550);
  }

  receiveDate(date:any) {
    console.log(date);
  }

}
