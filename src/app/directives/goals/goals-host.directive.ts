import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[goalsHost]'
})
export class GoalsHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
