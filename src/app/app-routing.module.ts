import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksMainComponent } from './components/tasks/_tasks-main/tasks-main.component';
import { GoalsMainComponent } from './components/goals/_goals-main/goals-main.component';
import { SettingsMainComponent } from './components/settings/_settings-main/settings-main.component';
// Services
import { GoalsResolverService } from './services/goals/goals-resolver.service';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
