import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
// Select
declare function Select(): void;
// Services
import { SetThemeService } from 'src/app/services/set-theme.service';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
// chartjs
import { ChartData, ChartConfiguration } from "chart.js";
import { chartColors } from '../charts/charts.config';
import { textInCenter } from '../charts/utils';
import { Subscription, filter, map } from 'rxjs';
import { Goal } from 'src/app/types/goal.type';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task.model';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);


@Component({
  selector: 'gt-dashboard',
  templateUrl: './dashboard.component.html',
  host: {'class': 'dashboard'},
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked {

  allGoals: Array<Goal> = [];
  allTasks:any = [];
  // categories
  familyAndCommunication:any;
  money:any;
  workCareer:any;
  healthAndSports:any;
  selfKnowledge:any;
  travels:any;
  @ViewChild('select_my_activity') select_my_activity!: ElementRef;
  @ViewChild('select_health_and_sports') select_health_and_sports!: ElementRef;
  themeName!: string | null;
  subscription!: Subscription;
  progressTowardsTheGoalData1!: ChartData<'doughnut'>;
  progressTowardsTheGoalData2!: ChartData<'doughnut'>;
  progressTowardsTheGoalData3!: ChartData<'doughnut'>;
  progressTowardsTheGoalData4!: ChartData<'doughnut'>;
  currentThemeName!: string | null;
  colors: any = sessionStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;
  // Today Tasks
  goalCategory!: any;

  constructor(
    private goalsService: GoalsService,
    private tasksService: TasksService,
    private setThemeService: SetThemeService,
    private router: ActivatedRoute
  ) {
    this.allGoals = this.router.snapshot.data['allGaols'];
  }

  ngOnInit() {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
    // Fetch Goals
    this.goalsService.goalsCollection()
    .subscribe(
      goals => {
        this.allGoals = goals;
      }
    )
    // Fetch Tasks
    this.tasksService.tasksCollection()
      .pipe(
        // filter(item => item.taskDate === '2023-06-10'),
        map(tasksArray => {
          tasksArray = tasksArray.filter((item:any) => item.taskDate === dayjs().format('YYYY-MM-DD'));
          return tasksArray;
        }),
        map(tasksArray => {
            return tasksArray.map(async (item:any) => {
                return {
                    ...item,
                    goalCategory: await this.getGoalCategory(item)
                }
            })
        })
      )
      .subscribe(async (tasks: Promise<Task>[]) => {
        const completedTasks = await Promise.all(tasks);
        this.allTasks = completedTasks;
        }
      )

  }





  ngAfterViewInit():void {
    new (Select as any)(this.select_my_activity.nativeElement, {
      placeholder: 'Week'
    });
    new (Select as any)(this.select_health_and_sports.nativeElement, {
      placeholder: 'Week'
    });
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
      })
    )
    .subscribe(
      goals => {
        this.allGoals = goals;
        this.familyAndCommunication = this.allGoals.filter((item:any) => item.category === 'family and communication');
        this.money = this.allGoals.filter((item:any) => item.category === 'money');
        this.workCareer = this.allGoals.filter((item:any) => item.category === 'work/career');
        this.healthAndSports = this.allGoals.filter((item:any) => item.category === 'health and sports');
        this.selfKnowledge = this.allGoals.filter((item:any) => item.category === 'self knowledge');
        this.travels = this.allGoals.filter((item:any) => item.category === 'travels');
      }
    )
    // Fetch Tasks
    this.tasksService.tasksCollection()
        .pipe(
          // filter(item => item.taskDate === '2023-06-10'),
          map(tasksArray => {
            tasksArray = tasksArray.filter((item:any) => item.taskDate === dayjs().format('YYYY-MM-DD'));
            return tasksArray;
          }),
          map(tasksArray => {
              return tasksArray.map(async (item:any) => {
                  return {
                      ...item,
                      goalCategory: await this.getGoalCategory(item)
                  }
              })
          })
        )
        .subscribe(async (tasks: Promise<Task>[]) => {
          const completedTasks = await Promise.all(tasks);
          this.allTasks = completedTasks;
          }
        )
  }



  // public getGoalCategory() {
  //  return this.goalsService.getGoalById('-NXRb_fNBUUvKxPoSL5W').subscribe(d => {
  //   this.goalCategory = d;
  //   console.log(this.goalCategory);
  //  });
  // }

  // getGoalCategory(item:any) {
	// 	this.goalsService.getGoalById(item.goal_id).subscribe(d => {
  //     this.goalCategory = d[0].category;
  //   })
  //  }

  getGoalCategory(item:any) {
    return new Promise((res) => {
        this.goalsService.getGoalById(item.goal_id)
            .subscribe(d => {
                res(d[0].category);
            })
    })
  }




  public progressTowardsTheGoalOptions: ChartConfiguration<'doughnut'>['options'] = {
    layout: {
      padding: {
          top: -20,
      }
  },
    cutout: "95%",
    radius: 45,
    responsive: true,
    // clip: {left: 0, top: 0, right: 0, bottom: 50},
    elements: {
      arc: {
        borderAlign: 'center',
        borderWidth: 0,
        borderJoinStyle: "round",
      }
    },

    animation: {
      animateRotate: true,
      onComplete: function() {
        textInCenter(this, '60%');
      },
    },
    events: []
  };

  ngAfterViewChecked():void {
    this.currentThemeName = this.themeName;
  }

  ngAfterContentChecked():void {
    this.colors = sessionStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;
    if (this.currentThemeName !== this.themeName) {
    this.progressTowardsTheGoalData1 = {
      datasets: [{
        label: '60%',
        data: [60, 40],
        backgroundColor: [this.colors.orange, this.colors.transparent]
      }]
    };


    this.progressTowardsTheGoalData2 = {
      datasets: [{
        label: '30%',
        data: [30, 70],
        backgroundColor: [this.colors.green, this.colors.transparent]
      }]
    };

    this.progressTowardsTheGoalData3 = {
      datasets: [{
        label: '10%',
        data: [10, 90],
        backgroundColor: [this.colors.blue, this.colors.transparent]
      }]
    };

    this.progressTowardsTheGoalData4 = {
      datasets: [{
        label: '65%',
        data: [65, 35],
        backgroundColor: [this.colors.yellow, this.colors.transparent]
      }]
    };


    }

  }

}
