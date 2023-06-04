import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[gtSwitchGoalsView]'
})
export class SwitchGoalsViewDirective {

  constructor(
    private elRef: ElementRef
  ) { }

  @HostListener('click')
  onClick(event:any) {
    // usuń z wszystkich przycisków klasę active
    const allGoalsViewSwitchers = document.querySelectorAll('.goals-view-switcher');
    Array.from(allGoalsViewSwitchers).forEach(item => {
      item.classList.remove('active');
    });
    this.elRef.nativeElement.classList.add('active');
  }

}
