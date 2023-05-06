import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
@Component({
  selector: 'gt-actions-nav-calendar',
  templateUrl: './actions-nav-calendar.component.html',
  host: { 'class': 'actions-nav actions-nav--calendar'},
  styleUrls: ['./actions-nav-calendar.component.scss']
})

export class ActionsNavCalendarComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Output() prevBtnEvent = new EventEmitter();

  currentCalendarType:any;

  constructor(
    private elRef: ElementRef,
    private calendarService: CalendarService
  ) { }


  triggerPrevBtn() {
    this.calendarService.previousBtnHandler();
  }

  ngOnInit():void {
    this.currentCalendarType = this.calendarService.currentCalendarType;
  }
  ngAfterViewInit(): void {
    this.setActiveIndicatior();

  }
  ngAfterViewChecked() {

  }



  // value = this.calendarService.observable.subscribe(isActive => this.test = isActive);



  switchCalendarType(event:Event) {
    const calendarType = (event.target as HTMLButtonElement).getAttribute('data-calendar-type');
    this.calendarService.currentCalendarType = calendarType!;
    this.calendarService.switchCalendarType(calendarType!);
  }


  setActiveIndicatior() {
    const calendarTypeList = this.elRef.nativeElement.querySelector('.calendar-type-list');
    const indicator = calendarTypeList.querySelector('.calendar-type-indicator');
    const currentMenuItem = calendarTypeList.querySelector('.calendar-type-list .btn.active');
    let menuLinkWidth = currentMenuItem.getBoundingClientRect().width;
    let currentMenuItemLeft = currentMenuItem.getBoundingClientRect().left;
    // currentMenuItemLeft - 260 zgadza się
    const parentLeft = calendarTypeList.getBoundingClientRect().left;
    // currentMenuItemLeft - 200 zgadza się
    console.log(parentLeft);
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
