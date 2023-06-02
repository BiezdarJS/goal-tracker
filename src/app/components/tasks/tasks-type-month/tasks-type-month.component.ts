import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/types/task.type';

@Component({
  selector: 'gt-tasks-type-month',
  templateUrl: './tasks-type-month.component.html',
  styleUrls: ['./tasks-type-month.component.scss']
})
export class TasksTypeMonthComponent implements OnInit, AfterViewInit, OnDestroy {


  public loading$!: boolean;
  databaseContent: Array<Task> = [];
  objectValues = Object.values;

  constructor(
    private tasksService: TasksService
  ) {}

  ngOnInit():void {
    this.loading$ = true;
  }

  ngAfterViewInit(): void {
    this.loading$ = true;
    setTimeout(() => {

      this.tasksService.fetchTasks()
        .subscribe((tasks:any) => {
          this.databaseContent = tasks;
          this.loading$ = false;
        })
    }, 550);
  }

  ngOnDestroy():void {
    this.loading$ = true;
    this.databaseContent = [];
  }

}
