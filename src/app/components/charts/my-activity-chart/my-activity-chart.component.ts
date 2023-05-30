import { Component, OnInit, OnDestroy, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { chartColors } from '../charts.config';
import { Subscription } from 'rxjs';
import { SetThemeService } from 'src/app/services/set-theme.service';

@Component({
  selector: 'gt-my-activity-chart',
  templateUrl: './my-activity-chart.component.html',
  host: {'class': 'chart-wrapper'},
  styleUrls: ['./my-activity-chart.component.scss']
})
export class MyActivityChartComponent implements OnInit, OnDestroy, AfterViewChecked, AfterContentChecked {

  themeName!: string | null;
  subscription!: Subscription;
  myActicityOptions: ChartConfiguration<'line'>['options'];
  myActivityDataWeek!: ChartData<'line'>;
  myActivityDataMonth!: ChartData<'line'>;
  currentThemeName!: string | null;
  colors: any = localStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;

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
  this.colors = localStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;
  if (this.currentThemeName !== this.themeName) {
    console.log(this.colors);
    this.myActicityOptions = {
      scales: {
        x: {
          grid: {
              display:false,
              circular: true,

          },
          ticks: {
            color: this.colors.lightDark
          }
        },
        y: {
          min: 1,
          max: 9,
          ticks: {
              stepSize: 1,
              color: this.colors.lightDark
          }
        },
    },
    // tension: 0.4,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: this.colors.lightDark
        }
      },
      tooltip: {
        backgroundColor: this.colors.lightDark,
        displayColors:false,
        titleColor: this.colors.lightDark
      },
    }
  };
    this.myActivityDataWeek = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Income",
          backgroundColor: this.colors.green,
          borderColor: this.colors.green,
          data: [4,6,5,8,7,3,2,4],
          pointHitRadius: 16,
        },
        {
          label: "More data",
          backgroundColor: this.colors.red,
          borderColor: this.colors.red,
          data: [2,5,4,7,5,4,5, 5]
        }
      ]
    }
    this.myActivityDataMonth = {
      labels: ["Mon", "Tue", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          label: "Income",
          backgroundColor: this.colors.green,
          borderColor: this.colors.green,
          data: [2,1,3,2,1,3,2],
          pointHitRadius: 16,
        },
        {
          label: "More data",
          backgroundColor: this.colors.red,
          borderColor: this.colors.red,
          data: [6,4,2,5,1,2,6]
        }
      ]
    }
  }
  }

}
