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
    HealthAndSportsChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
