import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../../types/task.type';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  allTasks: Array<Task> = [];
  newTask: any;
  components: any = [];
  // flag indicating whether loading is complete
  public loading$!: boolean;

  constructor(
    private http: HttpClient
  ) { }


  // TASKS
  tasksCollection():Observable<any> {
    return this.fetchTasks()
      .pipe(
        map(response => {
          const tasksArray = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              tasksArray.push({ ...response[key], id: key });
            }
          }
          return tasksArray;
        })
      );
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

    })
  }



}
