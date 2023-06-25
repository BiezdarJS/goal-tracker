import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[getPriority]'
})
export class GetPriorityDirective {

  constructor(
    private elRef: ElementRef
  ) { }

  @HostListener('click', ['$event'])
  getPriority(event:any) {
    if (event.target.matches('.label-priority')) {
      const buttonsCollection = document.querySelectorAll('.label-priority');
      Array.from(buttonsCollection).forEach(item => {
        item.classList.remove('active');
      })
      event.target.classList.add('active');
    }
  }
}
