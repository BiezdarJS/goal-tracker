import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[infoPopupHost]'
})
export class InfoPopupHostDirective {

  constructor( public viewContainerRef: ViewContainerRef) { }


}
