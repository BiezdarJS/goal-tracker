import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[newTaskHost]'
})
export class NewTaskDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
