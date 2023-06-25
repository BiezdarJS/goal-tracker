import { Injectable } from '@angular/core';
// Services
import { GoalsService } from '../goals/goals.service';
import { TasksService } from './tasks.service';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { forkJoin, map, Observable } from 'rxjs';
import { IGoal } from 'src/app/interfaces/goal.interface';
import { ITask } from 'src/app/interfaces/task.interface';


dayjs.extend(weekday);
dayjs.extend(weekOfYear);


@Injectable({
  providedIn: 'root'
})
export class ChartHelpersService {


  familyAndCommunicationData!: any;
  moneyData!:any;
  workCareerData!:any;
  healthAndSportsData!:any;
  selfKnowledgeData!:any;
  travelsData!:any;

  constructor(
    private goalsS: GoalsService,
    private tasksS: TasksService,
  ) { }


  getDaysFromThisWeek() {
    let daysArr = [];
    for(let i=1; i<=7; i++) {
      daysArr.push(dayjs().startOf('week').add(i, "day").format('YYYY-MM-DD'));
    }
    return daysArr;
  }




  getTasksByCategory(category: string): Observable<ITask[]> {
    const goalIds$ = this.goalsS.goalsCollection().pipe(
        map((goals) =>
            goals
                // filter goals with category from parameter
                .filter((goal: any) => goal.category === category)
                // get ID's of found goals in the previous step
                .map((goal: any) => goal.id)
        )
    );

    const tasks$ = this.tasksS.tasksCollection();
    const daysFromThisWeek = this.getDaysFromThisWeek();

    return forkJoin({
      goalsIDs: goalIds$,
        tasks: tasks$,
    }).pipe(
      // get IDs-matching-tasks
        map(({ tasks, goalsIDs }) => {
            let modArr = [] as any;
            goalsIDs.forEach((goalId:any) => {
                const forModArr = tasks.filter((task:any) => task.goal_id === goalId);
                modArr = modArr.concat(forModArr);
            })
            return modArr;
        }),
        map(tasksArr => {
            // get number of IDs-matching-tasks on each week day
            let finalTasks = [] as any;
            console.log(daysFromThisWeek);
            daysFromThisWeek.forEach((day:any) => {
                const forFinalTasks = tasksArr.filter((task:any) => task.taskDate === day);
                finalTasks = finalTasks.concat(forFinalTasks.length);
            });
            return finalTasks;
        })
    )
}



  // getTasksByCategory(category:string):Observable<any> {
  //   const daysFromThisWeek = this.getDaysFromThisWeek();
  //   return forkJoin({
  //     tasks: this.tasksS.tasksCollection(),
  //     goals: this.goalsS.goalsCollection(),
  //   })
  //   // OPERATIONS ON GOALS
  //   .pipe(
  //     // filter goals with category from parameter
  //     map(({ tasks, goals }) => {
  //       return goals.filter((item:any) => item.category === category);
  //     }),
  //     // get ID's of found goals in the previous step
  //     map((goals:any) => {
  //       const goalsIDs = goals.map((item:any) => item.id);
  //       return goalsIDs;
  //     })
  //   )
  //   // OPERATIONS ON TASKS
  //   .pipe(
  //     // get IDs-matching-tasks
  //     map(({ tasks, goalsIDs }) => {
  //       let modArr = [] as any;
  //       goalsIDs.forEach((goalId:any) => {
  //         const forModArr = tasks.filter((task:any) => task.goal_id === goalId);
  //         modArr = modArr.concat(forModArr);
  //     })
  //     return modArr;
  //   }),
  //   map(tasksArr => {
  //     // get number of IDs-matching-tasks on each week day
  //     let finalTasks = [] as any;
  //     daysFromThisWeek.forEach((day:any) => {
  //         const forFinalTasks = tasksArr.filter((task:any) => task.taskDate === day);
  //         finalTasks = finalTasks.concat(forFinalTasks.length);
  //     })
  //     return finalTasks;
  //   })
  //   )
  //   // .subscribe((goalsIDs:any) => {
  //   //   this.tasksS.tasksCollection()
  //   //     .pipe(
  //   //       // get IDs-matching-tasks
  //   //       map((tasksArr:any) => {
  //   //         let modArr = [] as any;
  //   //         goalsIDs.forEach((goalId:any) => {
  //   //           const forModArr = tasksArr.filter((task:any) => task.goal_id === goalId);
  //   //           modArr = modArr.concat(forModArr);
  //   //       })
  //   //       return modArr;
  //   //     }),
  //   //     map(tasksArr => {
  //   //       // get number of IDs-matching-tasks on each week day
  //   //       let finalTasks = [] as any;
  //   //       daysFromThisWeek.forEach((day:any) => {
  //   //           const forFinalTasks = tasksArr.filter((task:any) => task.taskDate === day);
  //   //           finalTasks = finalTasks.concat(forFinalTasks.length);
  //   //       })
  //   //       return finalTasks;
  //   //     })
  //   //     )
  //   //     .subscribe(async (finalTasks: Promise<any>[]) => {
  //   //       const completedTasks = await Promise.all(finalTasks);
  //   //       dataConsumer = completedTasks;
  //   //       }
  //   //     )
  //   //   })
  // }


}
