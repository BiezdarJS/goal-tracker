import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksMainComponent } from './components/tasks/_tasks-main/tasks-main.component';
import { GoalsMainComponent } from './components/goals/_goals-main/goals-main.component';
import { GoalsResolverService } from './services/goals-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      allGoals: GoalsResolverService
    }
  },
  { path: 'calendar', component: TasksMainComponent },
  { path: 'my-goals', component: GoalsMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
