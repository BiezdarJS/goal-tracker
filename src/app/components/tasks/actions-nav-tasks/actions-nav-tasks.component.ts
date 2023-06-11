import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarTasksService } from 'src/app/services/calendar/calendar-tasks.service';
import { TasksMainComponent } from '../_tasks-main/tasks-main.component';
import { CalendarNotificationService } from 'src/app/services/calendar/calendar-notification.service';

@Component({
  selector: 'gt-actions-nav-tasks',
  templateUrl: './actions-nav-tasks.component.html',
  host: { 'class': 'actions-nav actions-nav--calendar'},
  styleUrls: ['./actions-nav-tasks.component.scss']
})
export class ActionsNavTasksComponent implements OnInit, AfterViewInit {

  // Emit New Goal Event
  @Output() taskEvent = new EventEmitter();
  emitNewTaskEvent() {
    this.taskEvent.emit();
  }
  @Output() prevBtnEvent = new EventEmitter();
  @Output() nextBtnEvent = new EventEmitter();

  currentCalendarType:any;

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
  }
  ngAfterViewInit(): void {
    this.setActiveIndicatior();
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
