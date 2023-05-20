import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/_global/header/header.component';
import { SidenavComponent } from './components/_global/sidenav/sidenav.component';
import { FooterComponent } from './components/_global/footer/footer.component';
import { GoalTrackerComponent } from './components/_goal-tracker/goal-tracker.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalNewTaskComponent } from './components/_global/modal-new-task/modal-new-task.component';
import { BalanceOfGoalsChartComponent } from './components/charts/balance-of-goals-chart/balance-of-goals-chart.component';
import { MyActivityChartComponent } from './components/charts/my-activity-chart/my-activity-chart.component';
import { ProgressTowardsTheGoalChartComponent } from './components/charts/progress-towards-the-goal-chart/progress-towards-the-goal-chart.component';
import { HealthAndSportsChartComponent } from './components/charts/health-and-sports-chart/health-and-sports-chart.component';
import { CalendarDashboardComponent } from './components/calendars/calendar-dashboard/calendar-dashboard.component';
import { CalendarTypeItemDirective } from './directives/calendar-type-item.directive';
import { CalendarTypeListDirective } from './directives/calendar-type-list.directive';
import { GoalsMainComponent } from './components/goals/_goals-main/goals-main.component';
import { ActionsNavGoalsComponent } from './components/goals/actions-nav-goals/actions-nav-goals.component';
import { NewGoalComponent } from './components/goals/new-goal/new-goal.component';
import { GoalsGridComponent } from './components/goals/goals-grid/goals-grid.component';
import { NewGoalDirective } from './directives/goals/new-goal.directive';
import { OpenMobileMenuDirective } from './directives/sidenav/open-mobile-menu.directive';
import { CloseMobileMenuDirective } from './directives/sidenav/close-mobile-menu.directive';
import { NewTaskComponent } from './components/tasks/new-task/new-task.component';
import { TasksGridComponent } from './components/tasks/tasks-grid/tasks-grid.component';
import { NewTaskDirective } from './directives/tasks/new-task.directive';
import { TasksMainComponent } from './components/tasks/_tasks-main/tasks-main.component';
import { ActionsNavTasksComponent } from './components/tasks/actions-nav-tasks/actions-nav-tasks.component';
import { CalendarTypeDayComponent } from './components/tasks/calendar-type-day/calendar-type-day.component';
import { CalendarTypeMonthComponent } from './components/tasks/calendar-type-month/calendar-type-month.component';
import { CalendarTypeWeekComponent } from './components/tasks/calendar-type-week/calendar-type-week.component';
import { GetTaskPriorityDirective } from './directives/tasks/get-task-priority.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    GoalTrackerComponent,
    DashboardComponent,
    ModalNewTaskComponent,
    BalanceOfGoalsChartComponent,
    MyActivityChartComponent,
    ProgressTowardsTheGoalChartComponent,
    HealthAndSportsChartComponent,
    CalendarDashboardComponent,
    CalendarTypeItemDirective,
    CalendarTypeListDirective,
    GoalsMainComponent,
    ActionsNavGoalsComponent,
    NewGoalComponent,
    GoalsGridComponent,
    NewGoalDirective,
    OpenMobileMenuDirective,
    CloseMobileMenuDirective,
    NewTaskComponent,
    TasksGridComponent,
    NewTaskDirective,
    TasksMainComponent,
    CalendarTypeDayComponent,
    CalendarTypeMonthComponent,
    CalendarTypeWeekComponent,
    ActionsNavTasksComponent,
    GetTaskPriorityDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
