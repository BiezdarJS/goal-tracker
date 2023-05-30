import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  newTask: any;
  components: any = [];
  // flag indicating whether loading is complete
  public loading$!: boolean;

  constructor(
    private http: HttpClient
  ) { }


  // TASKS
  onFetchTasks():void {
    this.fetchTasks();
    this.loading$ = false;
  }

  fetchTasks(): Observable<any> {
    return this.http
      .get('https://goal-mangement-system-default-rtdb.europe-west1.firebasedatabase.app/tasks.json');
  }

  postTask():void {
    this.http.post(
      'https://goal-mangement-system-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      this.newTask
    ).subscribe(responseData => {
      console.log(responseData);
    })
  }


}