import { AfterContentChecked, AfterViewChecked, Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { Chart } from 'chart.js/auto';
import { ChartConfiguration, ChartData } from 'chart.js';
import { chartColors } from '../charts.config';
import { textInCenterWithLineBreak } from '../utils';
import { SetThemeService } from 'src/app/services/set-theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gt-balance-of-goals-chart',
  templateUrl: './balance-of-goals-chart.component.html',
  host: {'class': 'chart-wrapper'},
  styleUrls: ['./balance-of-goals-chart.component.scss']
})
export class BalanceOfGoalsChartComponent implements OnInit, OnDestroy, AfterViewChecked, AfterContentChecked {

  @Input() allGoals: any;
  themeName!: string | null;
  subscription!: Subscription;
  balanceOfGoalsData!: ChartData<'doughnut'>;
  currentThemeName!: string | null;
  colors: any = sessionStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;

  constructor(
    private setThemeService: SetThemeService
  ) {

  }

  ngOnInit():void {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked():void {
   this.currentThemeName = this.themeName;
  }

  ngAfterContentChecked():void {
    this.colors = sessionStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;
    if (this.currentThemeName !== this.themeName) {
      this.balanceOfGoalsData = {
        labels: [this.allGoals.length, 'GOALS'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              this.colors.green,
              this.colors.yellow,
              this.colors.red
            ],
            hoverOffset: 4
          }
        ]
      };
    }

  }


  public balanceOfGoalsOptions: ChartConfiguration<'doughnut'>['options'] = {

    cutout: '90%',
    elements: {
      arc: {
        borderWidth: 0,
        borderJoinStyle: "round",
        borderRadius: 25
      },
    },
    animation: {
      animateRotate: true,
      onComplete: function() {
        textInCenterWithLineBreak(this)
      }
    },
    events: [],
    plugins: {
      legend: {
        display: false
      }
    },
  };



}
