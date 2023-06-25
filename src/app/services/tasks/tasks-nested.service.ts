import { Injectable } from '@angular/core';
// Types
import { ITaskWithNumber } from 'src/app/interfaces/task-wtih-number.interface';

@Injectable()
export class TasksNestedService {

  number:any;
  tasks!:ITaskWithNumber[];

  constructor() {
    this.number = 0;
    this.tasks = [];
  }



}
