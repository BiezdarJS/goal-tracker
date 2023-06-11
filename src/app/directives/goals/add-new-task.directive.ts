import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[gtAddNewTask]'
})
export class AddNewTaskDirective {


  constructor(
    private elRef: ElementRef
  ) {}

  @HostListener('click')
  addNewTask() {


  }

}
