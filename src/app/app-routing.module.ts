import { NgModule } from '@angular/core';
// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksMainComponent } from './components/tasks/_tasks-main/tasks-main.component';
import { GoalsMainComponent } from './components/goals/_goals-main/goals-main.component';
import { SettingsMainComponent } from './components/settings/_settings-main/settings-main.component';
import { LoginComponent } from './components/login/login/login.component';
import { GoalTrackerComponent } from './components/_goal-tracker/goal-tracker.component';
// Services
import { GoalsResolverService } from './services/goals/goals-resolver.service';
// Router
import { RouterModule, Routes } from '@angular/router';
// AuthGuard
import { AuthGuard } from 'src/auth.guard';



const routes: Routes = [
  { path: 'sign-in', component: LoginComponent },
  {
    path: '',
    component: GoalTrackerComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        resolve: {
          allGoals: GoalsResolverService
        }
      },
      { path: 'calendar', component: TasksMainComponent },
      { path: 'my-goals', component: GoalsMainComponent },
      { path: 'settings', component: SettingsMainComponent}
    ],
    canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
