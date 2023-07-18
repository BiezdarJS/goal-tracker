import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// Components
import { InfoPopupComponent } from '../_info-popup/info-popup.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
// Directives
import { InfoPopupHostDirective } from 'src/app/directives/info/info-popup-host.directive';
import { NewTaskDirective } from 'src/app/directives/tasks/new-task.directive';
// Services
import { SetThemeService } from 'src/app/services/set-theme.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { TasksNotificationsService } from 'src/app/services/tasks/tasks-notifications.service';
import { SearchNotificationsService } from 'src/app/services/search/search-notifications.service';





@Component({
  selector: 'gt-goal-tracker',
  templateUrl: './goal-tracker.component.html',
  host: {'class': 'goal-and-time-management'},
  styleUrls: ['./goal-tracker.component.scss']
})
export class GoalTrackerComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {


  themeName!: string | null;
  subscription!: Subscription;
  // Info Pupup
  @ViewChild(InfoPopupHostDirective, {static:true}) infoPopupHost!: InfoPopupHostDirective;
  infoContainerRef!:any;
  // New Task
  @ViewChild(NewTaskDirective, {static:true}) newTaskHost!: NewTaskDirective;
  newTaskContainerRef!: any;
  // Session Storage
  welcomeMessage!:any;
  // New Task Notification
  triggerNewTask!:boolean;
  // New Task Subscriptions
  taskCloseEventSubscription:boolean = false;
  taskSubmitEventSubscription:boolean = false;
  // Search Subscription
  searchTextSubscription:string = '';


  constructor(
    private route: ActivatedRoute,
    private setThemeService: SetThemeService,
    private tasksService: TasksService,
    private tasksNotificationsS: TasksNotificationsService,
    private searchNotificationsS: SearchNotificationsService,
    private elRef: ElementRef
  ) {}




  ngOnInit():void {
    // Session Storage
    this.welcomeMessage = sessionStorage.getItem('welcome-message');
    // Set Active Theme
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
    this.setThemeService.setTheme('theme-light');
    document.body.classList.add(''+this.themeName+'');
    // Initialize Host Containers
    this.newTaskContainerRef = this.newTaskHost.viewContainerRef;
    // Task Notification Subscription
    this.tasksNotificationsS.newTaskSubject.subscribe(d => {
      this.triggerNewTask = d;
    });
    // Search Subscription
    this.searchNotificationsS.searchValueSubject.subscribe((d:string) => {
      this.searchTextSubscription = d;
    });
  }

  ngAfterViewInit():void {
    // Info Pupup
    this.infoContainerRef = this.infoPopupHost.viewContainerRef;
    // New Task
    this.newTaskContainerRef = this.newTaskHost.viewContainerRef;
    // Initialize
    if (this.welcomeMessage !== 'accepted') {
      setTimeout(() => {
        this.openInfoPopup();
      }, 5000);
    }
  }

  ngAfterViewChecked():void {
    // Update Active Theme
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(''+this.themeName+'');
    // New Task
    if (this.triggerNewTask) {
      this.createNewTask();
      this.tasksNotificationsS.sendTasksNotification(false);
    }
    if (this.taskCloseEventSubscription === true) {
      this.removeNewTask();
      this.taskCloseEventSubscription = false;
    }
    if (this.taskSubmitEventSubscription === true) {
      this.removeNewTask();
      this.taskSubmitEventSubscription = false;
    }
  }



  openInfoPopup() {
    this.infoContainerRef.createComponent(InfoPopupComponent);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // New Task
  createNewTask() {
    const newTask = this.newTaskContainerRef.createComponent(NewTaskComponent);
    newTask.instance.taskCloseEvent.subscribe((d:boolean) => {
      this.taskCloseEventSubscription = d;
    });
    newTask.instance.taskSubmitEvent.subscribe((d:boolean) => {
      this.taskCloseEventSubscription = d;
    });
  }

  removeNewTask() {
    setTimeout(() => {
      this.newTaskContainerRef.clear();
      this.tasksService.components = [];
    }, 1000);
  }



}
