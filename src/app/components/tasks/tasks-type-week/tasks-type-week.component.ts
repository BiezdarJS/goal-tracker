import { Component } from '@angular/core';
// Services
import { GoalsService } from 'src/app/services/goals/goals.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
// Types
import { IGoal } from 'src/app/interfaces/goal.interface';
import { ITask } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'gt-tasks-type-week',
  templateUrl: './tasks-type-week.component.html',
  styleUrls: ['./tasks-type-week.component.scss']
})
export class TasksTypeWeekComponent {

  public loading$!: boolean;
  allGoals: Array<IGoal> = [];
  allTasks: Array<ITask> = [];
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
