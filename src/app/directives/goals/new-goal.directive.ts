import { ChangeDetectorRef, Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[newGoalHost]'
})
export class NewGoalDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
  ) { }




}
