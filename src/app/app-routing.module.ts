import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarsMainComponent } from './components/calendars/calendars-main/calendars-main.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'calendar', component: CalendarsMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
