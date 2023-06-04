import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
// Services
import { GoalsService } from 'src/app/services/goals/goals.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
// Types
import { Goal } from 'src/app/types/goal.type';
import { Task } from 'src/app/types/task.type';

@Component({
  selector: 'gt-tasks-type-month',
  templateUrl: './tasks-type-month.component.html',
  styleUrls: ['./tasks-type-month.component.scss']
})
export class TasksTypeMonthComponent implements OnInit, AfterViewInit, OnDestroy {


  public loading$!: boolean;
  allGoals: Array<Goal> = [];
  allTasks: Array<Task> = [];
  objectValues = Object.values;

  constructor(
    public goalsService: GoalsService,
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
          this.allTasks = tasks;
          this.loading$ = false;
        })
    }, 550);
    // Fetch Goals
    this.goalsService.goalsCollection().subscribe(response => {
      this.allGoals = response;
    });
  }

  ngOnDestroy():void {
    this.loading$ = true;
    this.allTasks = [];
  }

}
