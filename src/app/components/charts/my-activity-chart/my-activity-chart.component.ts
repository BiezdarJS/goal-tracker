import { Component, OnInit, OnDestroy, AfterViewChecked, AfterContentChecked, AfterViewInit, Input } from '@angular/core';
// Chart
import { ChartConfiguration, ChartData } from 'chart.js';
import { chartColors } from '../charts.config';
// RxJS
import { Subscription, map } from 'rxjs';
// Services
import { SetThemeService } from 'src/app/services/set-theme.service';
import { ChartHelpersService } from 'src/app/services/tasks/chart-helpers.service';



@Component({
  selector: 'gt-my-activity-chart',
  templateUrl: './my-activity-chart.component.html',
  host: {'class': 'chart-wrapper'},
  styleUrls: ['./my-activity-chart.component.scss']
})
export class MyActivityChartComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentChecked {

  @Input('myActicitySelectValue') myActicitySelectValue!:string;
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
  moneyData2$!:any;
  workCareerData!:any;
  healthAndSportsData!:any;
  selfKnowledgeData!:any;
  travelsData!:any;

  test$!:any;



  constructor(
    private chartHelpersS: ChartHelpersService,
    private setThemeService: SetThemeService
  ) {}

   async ngOnInit() {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
    // test
    // this.moneyData$ = this.chartHelpersS.getTasksByCategory('health and sports').pipe(map(value => value.Data));
    // this.moneyData2$ = this.moneyData$.pipe(map((value:any) => value.Data + 25));
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked():void {
    this.currentThemeName = this.themeName;
  }

  ngAfterViewInit() {
    this.test$ = this.chartHelpersS.getTasksByCategory('health and sports');
  }

  ngAfterContentChecked() {
    // this.test$ = this.chartHelpersS.getTasksByCategory('health and sports');
    this.colors = sessionStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;
    if (this.currentThemeName !== this.themeName) {
      this.chartHelpersS.getTasksByCategory('health and sports').subscribe(d => {
        this.healthAndSportsData = d;
        console.log(this.healthAndSportsData );
        this.myActicityOptions = {
          scales: {
            x: {
              grid: {
                display: false,
                circular: true,
              },
              ticks: {
                color: this.colors.lightDark
              }
            },
            y: {
              min: 0,
              max: 9,
              ticks: {
                stepSize: 1,
                color: this.colors.lightDark
              }
            },
          },
          elements: {
            line: {
              tension: 0.4,
            }
          },
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
              displayColors: false,
              titleColor: this.colors.lightDark
            },
          }
        };
        this.myActivityDataWeek = {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{
            label: "Work/Career",
            backgroundColor: this.colors.green,
            borderColor: this.colors.green,
            data: [3, 1, 2, 3, 2, 5, 8],
            pointHitRadius: 16,
          }, {
            label: "Self Knowledge",
            backgroundColor: this.colors.red,
            borderColor: this.colors.red,
            data: [4, 5, 1, 5, 7, 5, 2]
          }, {
            label: "Health and sports",
            backgroundColor: this.colors.yellow,
            borderColor: this.colors.yellow,
            data: this.healthAndSportsData
          }]
        }
        this.myActivityDataMonth = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
            label: "Income",
            backgroundColor: this.colors.green,
            borderColor: this.colors.green,
            data: [2, 1, 3, 2, 1, 3, 2, 2,5, 7,5, 3],
            pointHitRadius: 16,
          }, {
            label: "More data",
            backgroundColor: this.colors.red,
            borderColor: this.colors.red,
            data: [6, 4, 2, 5, 1, 2, 6, 2, 1, 5,2, 4]
          }]
        }
      });
    }
  }




}
