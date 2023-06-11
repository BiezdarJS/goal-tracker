import { Injectable } from '@angular/core';
// Components
import { NewTaskNestedComponent } from 'src/app/components/tasks/new-task-nested/new-task-nested.component';
// Types
import { TaskNested } from 'src/app/types/task-nested.type';

@Injectable()
export class TaskNestedService {

  number:any;

  constructor() {
    this.number = 1;
  }

  getTask() {
    return [
      new TaskNested(
        NewTaskNestedComponent,
        { number: this.number }
      )
    ];
  }

}
