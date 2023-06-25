import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
// Types
import { IGoal } from 'src/app/interfaces/goal.interface';



@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  // View
  activeView!:any;
  // GOALS
  allGoals: Array<IGoal> = [];
  components: any = [];

  constructor(
    private http: HttpClient
  ) { }



  fetchGoals(): Observable<any> {
    return this.http
      .get('https://goal-mangement-system-default-rtdb.europe-west1.firebasedatabase.app/goals.json');
  }

  postGoal(newGoal:any):void {
    this.http.post(
      'https://goal-mangement-system-default-rtdb.europe-west1.firebasedatabase.app/goals.json',
      newGoal
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

  fetchGoalsWithFilter(categoryValue:string,dateValue:string):Observable<any> {
    return this.goalsCollection()
        .pipe(
          map(response => {
            // Filter by Category
            if (categoryValue !== 'all') {
              response = response.filter((v:any) => v.category === categoryValue)
            }
            // Filter by Date
            if (dateValue === 'creation date') {
              let endDates = response.map((item:any) => item.endDate.split('-')).map((item:any) => {
                return {
                  timepstamp: new Date(item[0], item[1]-1, item[2]).getTime()
                }
              }).map((item:any) => item.timepstamp);
              response = response.map((item:any,idx:number) => {
                return {
                  id: item.id,
                  name: item.name,
                  isMainGoal: item.isMainGoal,
                  details: item.details,
                  category: item.category,
                  creationDate: item.creationDate,
                  endDate: endDates[idx],
                }
              })
              // Sort the result
              .sort((item1:any, item2:any) => item1.creationDate - item2.creationDate);
            }
            return response;
            })
        )
  }


  getGoalById(id:string):Observable<any> {
    return this.goalsCollection()
    .pipe(
      map(response => {
        response = response.filter((v:any) => v.id === id);
        return response;
      })
    )
  }


  getTaskClass(allGoals:any,goal_id:any) {
    const goal = allGoals.find((item:any) => item.id === goal_id);
    let myClass;
    if (goal) {
      if (goal.category === 'family/communication') {
        myClass = 'task-item--family-and-communication';
      }
      if (goal.category === 'money') {
        myClass = 'task-item--money';
      }
      if (goal.category === 'work/career') {
        myClass = 'task-item--career';
      }
      if (goal.category === 'health and sports') {
        myClass = 'task-item--health-and-sports';
      }
      if (goal.category === 'self knowledge') {
        myClass = 'task-item--self-knowledge';
      }
      if (goal.category === 'travels') {
        myClass = 'task-item--travels';
      }
    }
    return myClass;
  }


}
