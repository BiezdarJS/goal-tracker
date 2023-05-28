import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Chart, ChartType, ChartConfiguration, ChartData } from 'chart.js/auto';
import { drawCirclePlugin } from '../charts.plugins';
import { Subscription } from 'rxjs';
import { SetThemeService } from 'src/app/services/set-theme.service';

@Component({
  selector: 'gt-progress-towards-the-goal-chart',
  templateUrl: './progress-towards-the-goal-chart.component.html',
  host: {'class': 'progress-towards-the-goal-item__left'},
  styleUrls: ['./progress-towards-the-goal-chart.component.scss']
})
export class ProgressTowardsTheGoalChartComponent implements OnInit, OnDestroy {

  @Input() progressTowardsTheGoalData!: ChartData<'doughnut'>; // <- note this line
  @Input() progressTowardsTheGoalType!: ChartType;
  @Input() progressTowardsTheGoalConfig!: ChartConfiguration<'doughnut'>['options'];

  themeName!: string | null;
  subscription!: Subscription;

  constructor(
    private setThemeService: SetThemeService
  ) {}

  ngOnInit():void {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  public drawCirclePlugin = [drawCirclePlugin];



}
