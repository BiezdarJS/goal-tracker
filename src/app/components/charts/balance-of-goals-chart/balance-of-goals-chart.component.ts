import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Chart } from 'chart.js/auto';
import { ChartConfiguration, ChartData } from 'chart.js';
import { chartColors } from '../charts.config';
import { textInCenterWithLineBreak } from '../utils';

@Component({
  selector: 'gt-balance-of-goals-chart',
  templateUrl: './balance-of-goals-chart.component.html',
  host: {'class': 'chart-wrapper'},
  styleUrls: ['./balance-of-goals-chart.component.scss']
})
export class BalanceOfGoalsChartComponent {


  public balanceOfGoalsData: ChartData<'doughnut'> = {
    labels: ['16', 'GOALS'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          chartColors.green,
          chartColors.yellow,
          chartColors.red
        ],
        hoverOffset: 4
      }
    ]
  };

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
