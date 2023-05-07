import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[calendarTypeItemHandler]'
})
export class CalendarTypeItemDirective {

  currentCalendarType:any;


  constructor(
    private el: ElementRef
  ) { }



  @HostListener('mouseover')
  onMouseOver() {
    const calendarTypeList = this.el.nativeElement.parentNode.parentNode;
    const indicator = this.el.nativeElement.parentNode.parentNode.querySelector('.calendar-type-indicator');
    if (document.documentElement.clientWidth >= 1200) {
        indicator.style.transition = "0.35s .1s";
    }
    if (document.documentElement.clientWidth < 1200) {
        indicator.style.transition = "0s";
    }
    let menuLinkWidth = this.el.nativeElement.getBoundingClientRect().width;
    const parentLeft = calendarTypeList.getBoundingClientRect().left;
    let childLeft = this.el.nativeElement.getBoundingClientRect().left;
    let indicatorLeft = childLeft - parentLeft;
    indicator.style.width = menuLinkWidth + 'px';
    indicator.style.left = indicatorLeft + 'px';
  }

  @HostListener('click')
  onClick() {
    setTimeout(() => {
      // remove acitve class
    const calendarTypes:NodeListOf<HTMLButtonElement> = this.el.nativeElement.parentNode.parentNode.querySelectorAll('.calendar-type > .btn');
    const type = this.el.nativeElement.getAttribute('data-calendar-type');
    const clickedElement = this.el.nativeElement;
    Array.from(calendarTypes).forEach(item => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
    if (!clickedElement.classList.contains('active')) {
      clickedElement.classList.add('active');
    }
    });

  }




}
