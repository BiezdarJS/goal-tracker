import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Injectable({
  providedIn: 'root'
})
export class GoalsService {


  // CALENDAR
  INITIAL_YEAR = dayjs().format("YYYY");
  INITIAL_MONTH = dayjs().format("M");
  selectedMonth = dayjs(`${this.INITIAL_YEAR}-${this.INITIAL_MONTH}-1`);
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // GOALS
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


  // GOALS
  onFetchGoals():void {
    this.fetchGoals();
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

}
