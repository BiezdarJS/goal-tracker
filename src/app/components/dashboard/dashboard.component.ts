import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// Select
declare function Select(): void;
// chartjs
import { Chart, ChartData, ChartConfiguration } from "chart.js";
import { chartColors } from '../charts/charts.config';
import { textInCenter } from '../charts/utils';

@Component({
  selector: 'gt-dashboard',
  templateUrl: './dashboard.component.html',
  host: {'class': 'dashboard'},
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('select_my_activity') select_my_activity!: ElementRef;
  @ViewChild('select_health_and_sports') select_health_and_sports!: ElementRef;

  ngOnInit() {

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
    // plugins: {
    //   drawCirclePlugin : {
    //     backgroundColor: '#ddd',
    //   }
    // },
    responsive: true,
    elements: {
      arc: {
        borderWidth: 0,
        borderJoinStyle: "round",
        borderRadius: 25
      }
    },
    cutout: "95%",
    animation: {
      animateRotate: true,
      onComplete: function() {
        textInCenter(this, '60%');
      },
    },
    events: []
};


  public progressTowardsTheGoalData1: ChartData<'doughnut'> = {
    datasets: [{
      label: '60%',
      data: [60, 40],
      backgroundColor: [chartColors.orange, chartColors.transparent]
    }]
  };


  public progressTowardsTheGoalData2: ChartData<'doughnut'> = {
    datasets: [{
      label: '30%',
      data: [30, 70],
      backgroundColor: [chartColors.green, chartColors.transparent]
    }]
  };

  public progressTowardsTheGoalData3: ChartData<'doughnut'> = {
    datasets: [{
      label: '10%',
      data: [10, 90],
      backgroundColor: [chartColors.blue, chartColors.transparent]
    }]
  };

  public progressTowardsTheGoalData4: ChartData<'doughnut'> = {
    datasets: [{
      label: '65%',
      data: [65, 35],
      backgroundColor: [chartColors.yellow, chartColors.transparent]
    }]
  };


  // public progressTowardsTheGoalData: ChartDataset<'doughnut'>[] = [
  //   {
  //     label: '60%',
  //     data: [60, 40],
  //     backgroundColor: [chartColors.orange, chartColors.transparent]
  //   }, {
  //     label: '30%',
  //     data: [30, 70],
  //     backgroundColor: [chartColors.green, chartColors.transparent]
  //   }, {
  //     label: '10%',
  //     data: [10, 90],
  //     backgroundColor: [chartColors.blue, chartColors.transparent]
  //   }, {
  //     label: '65%',
  //     data: [65, 35],
  //     backgroundColor: [chartColors.yellow, chartColors.transparent]
  //   }
  // ];

}
