import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';
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
import { ActionsNavCalendarComponent } from './components/calendars/actions-nav-calendar/actions-nav-calendar.component';
import { CalendarTypeWeekComponent } from './components/calendars/calendar-type-week/calendar-type-week.component';
import { CalendarTypeMonthComponent } from './components/calendars/calendar-type-month/calendar-type-month.component';
import { CalendarTypeDayComponent } from './components/calendars/calendar-type-day/calendar-type-day.component';
import { CalendarsHostComponent } from './components/calendars/calendars-host/calendars-host.component';
import { CalendarTypeItemDirective } from './directives/calendar-type-item.directive';
import { CalendarTypeListDirective } from './directives/calendar-type-list.directive';
import { GoalsHostComponent } from './components/goals/goals-host/goals-host.component';
import { ActionsNavGoalsComponent } from './components/goals/actions-nav-goals/actions-nav-goals.component';
import { NewGoalComponent } from './components/goals/new-goal/new-goal.component';
import { GoalsGridComponent } from './components/goals/goals-grid/goals-grid.component';
import { NewGoalDirective } from './directives/goals/new-goal.directive';
import { OpenMobileMenuDirective } from './directives/sidenav/open-mobile-menu';

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
    ActionsNavCalendarComponent,
    CalendarTypeWeekComponent,
    CalendarTypeMonthComponent,
    CalendarTypeDayComponent,
    CalendarsHostComponent,
    CalendarTypeItemDirective,
    CalendarTypeListDirective,
    GoalsHostComponent,
    ActionsNavGoalsComponent,
    NewGoalComponent,
    GoalsGridComponent,
    NewGoalDirective,
    OpenMobileMenuDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
