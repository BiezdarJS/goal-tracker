import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
// Components
import { TasksMainComponent } from '../_tasks-main/tasks-main.component';
// Services
import { CalendarTasksService } from 'src/app/services/calendar/calendar-tasks.service';
import { CalendarNotificationService } from 'src/app/services/calendar/calendar-notification.service';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
  selector: 'gt-actions-nav-tasks',
  templateUrl: './actions-nav-tasks.component.html',
  host: { 'class': 'actions-nav actions-nav--calendar'},
  styleUrls: ['./actions-nav-tasks.component.scss']
})
export class ActionsNavTasksComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked {

  // Emit New Task Event
  @Output() taskEvent = new EventEmitter();
  emitNewTaskEvent() {
    this.taskEvent.emit();
  }
  @Output() prevBtnEvent = new EventEmitter();
  @Output() nextBtnEvent = new EventEmitter();

  currentCalendarType:any;
  selectedMonth:any;

  constructor(
    private elRef: ElementRef,
    private parentRef: TasksMainComponent,
    private calendarTasksService: CalendarTasksService,
    private calendarNotificationS: CalendarNotificationService
  ) { }


  triggerPrevBtn() {
    this.prevBtnEvent.emit();
    this.calendarTasksService.previousBtnHandler();
    this.calendarNotificationS.sendSwitcherBtnNotification(true);
  }
  triggerNextBtn() {
    this.nextBtnEvent.emit();
    this.calendarTasksService.nextBtnHandler();
    this.calendarNotificationS.sendSwitcherBtnNotification(true);
  }

  ngOnInit():void {
    this.currentCalendarType = this.calendarTasksService.currentCalendarType;
    this.selectedMonth = parseInt(this.calendarTasksService.selectedMonth.format('M'),10)-1;
    this.selectedMonth = this.calendarTasksService.monthNames[this.selectedMonth];
  }
  ngAfterViewInit(): void {
    this.setActiveIndicatior();
  }

  ngAfterViewChecked():void {

  }

  ngAfterContentChecked():void {
    this.selectedMonth = parseInt(this.calendarTasksService.selectedMonth.format('M'),10)-1;
    this.selectedMonth = this.calendarTasksService.monthNames[this.selectedMonth];
    console.log(this.selectedMonth);
  }


  switchCalendarType(event:Event) {
    const calendarType = (event.target as HTMLButtonElement).getAttribute('data-calendar-type');
    this.calendarTasksService.currentCalendarType = calendarType!;
    this.calendarTasksService.switchCalendarType(calendarType!);
    this.parentRef.refreshTasksGrid();
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
