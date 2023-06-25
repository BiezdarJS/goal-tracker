import { Directive, ElementRef, Host, HostListener, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[newTaskHost]'
})
export class NewTaskDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
    private elRef: ElementRef
    ) { }




}
