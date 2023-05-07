import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarsHostComponent } from './components/calendars/calendars-host/calendars-host.component';
import { GoalsHostComponent } from './components/goals/goals-host/goals-host.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'calendar', component: CalendarsHostComponent },
  { path: 'my-goals', component: GoalsHostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
