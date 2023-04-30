import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartConfiguration } from "chart.js";
import { chartColors } from '../charts/charts.config';
import { textInCenter } from '../charts/utils';


@Component({
  selector: 'gt-goal-tracker',
  templateUrl: './goal-tracker.component.html',
  host: {'class': 'goal-and-time-management'},
  styleUrls: ['./goal-tracker.component.scss']
})
export class GoalTrackerComponent implements OnInit {


  ngOnInit():void {

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
