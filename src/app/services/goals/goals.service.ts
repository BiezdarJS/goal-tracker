import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { Goal } from '../../types/goal.type';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  // View
  activeView!:any;
  // CALENDAR
  INITIAL_YEAR = dayjs().format("YYYY");
  INITIAL_MONTH = dayjs().format("M");
  selectedMonth = dayjs(`${this.INITIAL_YEAR}-${this.INITIAL_MONTH}-1`);
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // GOALS
  allGoals: Array<Goal> = [];
  newGoal: any;
  components: any = [];

  constructor(
    private http: HttpClient
  ) { }


  // CALENDAR
  previousBtnHandler() {
    this.selectedMonth = dayjs(this.selectedMonth).subtract(3, "month");
  }
  nextBtnHandler() {
    this.selectedMonth = dayjs(this.selectedMonth).add(3, "month");
  }



  fetchGoals(): Observable<any> {
    return this.http
      .get('https://goal-mangement-system-default-rtdb.europe-west1.firebasedatabase.app/goals.json');
  }

  postGoal():void {
    this.http.post(
      'https://goal-mangement-system-default-rtdb.europe-west1.firebasedatabase.app/goals.json',
      this.newGoal
    ).subscribe(responseData => {

    })
  }

  // GOALS
  goalsCollection():Observable<any> {
    // Fetch Goals
    return this.fetchGoals()
      .pipe(
        map(response => {
          const goalsArray = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              goalsArray.push({ ...response[key], id: key });
            }
          }
          return goalsArray;
        })
      );
  }

  filter(categoryValue:string,dateValue:string):Observable<any> {
    return this.goalsCollection()
        .pipe(
          map(response => {
            // Filter by Category
            if (categoryValue !== 'all') {
              response = response.filter((v:any) => v.category === categoryValue)
            }
            // Filter by Date
            if (dateValue === 'creation date') {
              let creationDates = response.map((item:any) => item.creationDate.split('-')).map((item:any) => {
                return {
                  timepstamp: new Date(item[0], item[1]-1, item[2]).getTime()
                }
              }).map((item:any) => item.timepstamp);
              response = response.map((item:any,idx:number) => {
                return {
                  category: item.category,
                  creationDate: creationDates[idx],
                  details: item.details,
                  id: item.id,
                  isMainGoal: item.isMainGoal,
                  name: item.name
                }
              })
              // Sort the result
              .sort((item1:any, item2:any) => item1.creationDate - item2.creationDate);
            }
            return response;
            })
        )
  }


  getTaskClass(allGoals:any,goal_id:any) {
    const mega = allGoals.find((item:any) => item.id === goal_id);
    let myClass;
    if (mega) {
      if (mega.category === 'family/communication') {
        myClass = 'task-item--family-and-communication';
      }
      if (mega.category === 'money') {
        myClass = 'task-item--money';
      }
      if (mega.category === 'work/career') {
        myClass = 'task-item--career';
      }
      if (mega.category === 'health and sports') {
        myClass = 'task-item--health-and-sports';
      }
      if (mega.category === 'self knowledge') {
        myClass = 'task-item--self-knowledge';
      }
      if (mega.category === 'travels') {
        myClass = 'task-item--travels';
      }
    }
    return myClass;
  }

}
