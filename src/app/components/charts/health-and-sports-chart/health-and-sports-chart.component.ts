import { AfterContentChecked, AfterViewChecked, Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  @Input('healthAndSportsSelectValue') healthAndSportsSelectValue!:string;
  themeName!: string | null;
  subscription!: Subscription;
  currentThemeName!: string | null;
  healthAndSportsDataWeek!: ChartData<'bar'>;
  healthAndSportsDataMonth!: ChartData<'bar'>;
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

      this.healthAndSportsDataWeek = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: 'Run',
          backgroundColor: this.colors.red,
          data: [1, 59, 5, 56, 58, 12, 59]
        }, {
          label: 'Yoga',
          backgroundColor: this.colors.yellow,
          data: [12, 59, 5, 56, 58, 12, 59]
        }, {
          label: 'Workout',
          backgroundColor: this.colors.green,
          data: [12, 59, 5, 56, 58, 12, 59]
        }, {
          label: 'Swim',
          backgroundColor: '#ddd',
          data: [12, 59, 5, 56, 58, 12, 59]
        }]
      };

      this.healthAndSportsDataMonth = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: 'Run',
          backgroundColor: this.colors.red,
          data: [12, 59, 5, 56, 58, 12, 59, 87, 45, 40, 50, 12]
        }, {
          label: 'Yoga',
          backgroundColor: this.colors.yellow,
          data: [12, 59, 5, 56, 58, 12, 59, 85, 23, 12, 56, 43]
        }, {
          label: 'Workout',
          backgroundColor: this.colors.green,
          data: [12, 59, 5, 56, 58, 12, 59, 65, 51, 12, 56, 22]
        }, {
          label: 'Swim',
          backgroundColor: '#ddd',
          data: [12, 59, 5, 56, 58, 12, 59, 12, 74, 12, 23, 43]
        }]
      };

    }

  }


}
