import { Component, OnInit, OnDestroy, AfterViewChecked, AfterContentChecked } from '@angular/core';
// Chart
import { ChartConfiguration, ChartData } from 'chart.js';
import { chartColors } from '../charts.config';
// RxJS
import { Subscription } from 'rxjs';
// Services
import { SetThemeService } from 'src/app/services/set-theme.service';
import { ChartHelpersService } from 'src/app/services/tasks/chart-helpers.service';



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
  colors: any = sessionStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;
  // Days from this week
  daysFromThisWeek!: any;
  familyAndCommunicationData!: any;
  moneyData!:any;
  workCareerData!:any;
  healthAndSportsData!:any;
  selfKnowledgeData!:any;
  travelsData!:any;


  constructor(
    private chartHelpersS: ChartHelpersService,
    private setThemeService: SetThemeService
  ) {}

   async ngOnInit() {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




  ngAfterViewChecked():void {
    this.currentThemeName = this.themeName;
  }

 async ngAfterContentChecked() {
  this.colors = sessionStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;
  if (this.currentThemeName !== this.themeName) {
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
          label: "Work/Career",
          backgroundColor: this.colors.green,
          borderColor: this.colors.green,
          data: [3,1,2,3,2,5,8],
          pointHitRadius: 16,
        },
        {
          label: "Self Knowledge",
          backgroundColor: this.colors.red,
          borderColor: this.colors.red,
          data: [4,5,1,5,7,5,2]
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
