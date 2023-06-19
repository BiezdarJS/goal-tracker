import { Injectable } from '@angular/core';
// Services
import { GoalsService } from '../goals/goals.service';
import { TasksService } from './tasks.service';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { map } from 'rxjs';

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
    private goalsService: GoalsService,
    private tasksService: TasksService,
  ) { }


  getDaysFromThisWeek() {
    let daysArr = [];
    for(let i=1; i<=7; i++) {
      daysArr.push(dayjs().startOf('week').add(i, "day").format('YYYY-MM-DD'));
    }
    return daysArr;
  }

  getTasksByCategory(dataConsumer:any, category:string) {
    const daysFromThisWeek = this.getDaysFromThisWeek();
    this.goalsService.goalsCollection()
    .pipe(
      map((goalsArr:any) => {
        goalsArr = goalsArr.filter((item:any) => item.category === category);
        return goalsArr;
      }),
      map((goalsArr:any) => {
        const goalsIDs = goalsArr.map((item:any) => item.id);
        return goalsIDs;
      })
    )
    .subscribe((goalsIDs:any) => {
      this.tasksService.tasksCollection()
        .pipe(
          // get category-matching-tasks
          map((tasksArr:any) => {
            let modArr = [] as any;
            goalsIDs.forEach((goalId:any) => {
              const forModArr = tasksArr.filter((task:any) => task.goal_id === goalId);
              modArr = modArr.concat(forModArr);
          })
          return modArr;
        }),
        map(tasksArr => {
          // get number of category-matching-tasks on each week day
          let finalTasks = [] as any;
          daysFromThisWeek.forEach((day:any) => {
              const forFinalTasks = tasksArr.filter((task:any) => task.taskDate === day);
              finalTasks = finalTasks.concat(forFinalTasks.length);
          })
          return finalTasks;
        })
        )
        // .subscribe(d => {
        //   res = d;
        // })
        .subscribe(async (finalTasks: Promise<Number>[]) => {
          const completedTasks = await Promise.all(finalTasks);
          dataConsumer = completedTasks;
          // przypisz wartość do zmiennej wewnątrz subskrypcji
          }
        )
      }) // Subscribe
  }
}
