import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[tasksHost]'
})
export class TasksHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
