import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
// Select
declare function Select(): void;
// chartjs
import { Chart, ChartData, ChartConfiguration } from "chart.js";
import { chartColors } from '../charts/charts.config';
import { textInCenter } from '../charts/utils';
import { Subscription } from 'rxjs';
import { SetThemeService } from 'src/app/services/set-theme.service';

@Component({
  selector: 'gt-dashboard',
  templateUrl: './dashboard.component.html',
  host: {'class': 'dashboard'},
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked {

  @ViewChild('select_my_activity') select_my_activity!: ElementRef;
  @ViewChild('select_health_and_sports') select_health_and_sports!: ElementRef;
  themeName!: string | null;
  subscription!: Subscription;
  progressTowardsTheGoalData1!: ChartData<'doughnut'>;
  progressTowardsTheGoalData2!: ChartData<'doughnut'>;
  progressTowardsTheGoalData3!: ChartData<'doughnut'>;
  progressTowardsTheGoalData4!: ChartData<'doughnut'>;
  currentThemeName!: string | null;
  colors: any = localStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;

  constructor(
    private setThemeService: SetThemeService
  ) {}

  ngOnInit() {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
  }

  ngAfterViewInit():void {
    new (Select as any)(this.select_my_activity.nativeElement, {
      placeholder: 'Week'
    });
    new (Select as any)(this.select_health_and_sports.nativeElement, {
      placeholder: 'Week'
    });
  }


  public progressTowardsTheGoalOptions: ChartConfiguration<'doughnut'>['options'] = {
    layout: {
      padding: {
          top: -20,
      }
  },
    cutout: "95%",
    radius: 45,
    responsive: true,
    // clip: {left: 0, top: 0, right: 0, bottom: 50},
    elements: {
      arc: {
        borderAlign: 'center',
        borderWidth: 0,
        borderJoinStyle: "round",
      }
    },

    animation: {
      animateRotate: true,
      onComplete: function() {
        textInCenter(this, '60%');
      },
    },
    events: []
  };

  ngAfterViewChecked():void {
    this.currentThemeName = this.themeName;
  }

  ngAfterContentChecked():void {
    this.colors = localStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;
    if (this.currentThemeName !== this.themeName) {
    this.progressTowardsTheGoalData1 = {
      datasets: [{
        label: '60%',
        data: [60, 40],
        backgroundColor: [this.colors.orange, this.colors.transparent]
      }]
    };


    this.progressTowardsTheGoalData2 = {
      datasets: [{
        label: '30%',
        data: [30, 70],
        backgroundColor: [this.colors.green, this.colors.transparent]
      }]
    };

    this.progressTowardsTheGoalData3 = {
      datasets: [{
        label: '10%',
        data: [10, 90],
        backgroundColor: [this.colors.blue, this.colors.transparent]
      }]
    };

    this.progressTowardsTheGoalData4 = {
      datasets: [{
        label: '65%',
        data: [65, 35],
        backgroundColor: [this.colors.yellow, this.colors.transparent]
      }]
    };


    }

  }

}
