import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { TasksMainComponent } from '../_tasks-main/tasks-main.component';

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

  currentCalendarType:any;

  constructor(
    private elRef: ElementRef,
    private parentRef: TasksMainComponent,
    private calendarService: CalendarService
  ) { }


  triggerPrevBtn() {
    this.calendarService.previousBtnHandler();
  }
  triggerNextBtn() {
    this.calendarService.nextBtnHandler();
  }

  ngOnInit():void {
    this.currentCalendarType = this.calendarService.currentCalendarType;
  }
  ngAfterViewInit(): void {
    this.setActiveIndicatior();
  }



  switchCalendarType(event:Event) {
    const calendarType = (event.target as HTMLButtonElement).getAttribute('data-calendar-type');
    this.calendarService.currentCalendarType = calendarType!;
    this.calendarService.switchCalendarType(calendarType!);
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
