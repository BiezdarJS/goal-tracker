import { AfterContentChecked, AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { chartColors } from '../charts.config';
import { Subscription } from 'rxjs';
import { SetThemeService } from 'src/app/services/set-theme.service';

@Component({
  selector: 'gt-health-and-sports-chart',
  templateUrl: './health-and-sports-chart.component.html',
  styleUrls: ['./health-and-sports-chart.component.scss']
})
export class HealthAndSportsChartComponent implements OnInit, OnDestroy, AfterViewChecked, AfterContentChecked {

  themeName!: string | null;
  subscription!: Subscription;
  currentThemeName!: string | null;
  healthAndSportsData!: ChartData<'bar'>;
  healthAndSportsOptions: ChartConfiguration<'bar'>['options'];
  colors: any = sessionStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;

  constructor(
    private setThemeService: SetThemeService
  ) {}

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
      this.healthAndSportsOptions = {

        scales: {
          x: {
            beginAtZero: true,
            stacked: true,
            ticks: {
              color: this.colors.lightDark
            }
          },
          y: {
            stacked: true,
            type: 'linear',
            ticks: {
              color: this.colors.lightDark
            }
          }
        },
        responsive: true,
        maintainAspectRatio: true,
        events: [],
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: this.colors.lightDark
            }
          },

        }
      };

      this.healthAndSportsData = {
        labels: ["<  1", "1 - 2", "3 - 4", "5 - 9", "10 - 14", "15 - 19", "20 - 24", "25 - 29", "> - 29"],
        datasets: [{
          label: 'Employee',
          backgroundColor: this.colors.blue,
          data: [12, 59, 5, 56, 58, 12, 59, 87, 45]
        }, {
          label: 'Engineer',
          backgroundColor: this.colors.green,
          data: [12, 59, 5, 56, 58, 12, 59, 85, 23]
        }, {
          label: 'Government',
          backgroundColor: this.colors.yellow,
          data: [12, 59, 5, 56, 58, 12, 59, 65, 51]
        }, {
          label: 'Political parties',
          backgroundColor: this.colors.red,
          data: [12, 59, 5, 56, 58, 12, 59, 12, 74]
        }]
      };

    }

  }


}
