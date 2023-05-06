import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[calendarTypeListHandler]'
})
export class CalendarTypeListDirective {

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('mouseleave')
  onMouseLeave() {
    const calendarTypeList = this.el.nativeElement;
    const indicator = calendarTypeList.querySelector('.calendar-type-indicator');
    const currentMenuItem = this.el.nativeElement.querySelector('.btn.active');
    let menuLinkWidth = currentMenuItem.getBoundingClientRect().width;
    let currentMenuItemLeft = currentMenuItem.getBoundingClientRect().left;
    const parentLeft = calendarTypeList.getBoundingClientRect().left;
    let indicatorLeft = currentMenuItemLeft - parentLeft;
    if (document.documentElement.clientWidth >= 1201) {
        indicator.style.transition = "0.35s";
    }
    if (document.documentElement.clientWidth < 1201) {
        indicator.style.transition = "0s";
    }
    indicator.style.width = menuLinkWidth + 'px';
    indicator.style.left = indicatorLeft + 'px';
  }

}
