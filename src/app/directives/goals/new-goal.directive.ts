import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gtNewGoalHost]'
})
export class NewGoalDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
