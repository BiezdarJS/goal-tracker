import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { chartColors } from '../charts.config';

@Component({
  selector: 'gt-my-activity-chart',
  templateUrl: './my-activity-chart.component.html',
  host: {'class': 'chart-wrapper'},
  styleUrls: ['./my-activity-chart.component.scss']
})
export class MyActivityChartComponent {


  public myActivityDataWeek: ChartData<'line'> = {
    labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
      datasets: [
        {
          label: "Income",
          backgroundColor: '#8eefca',
          borderColor: '#8eefca',
          data: [4,6,5,8,7,3,2,4],
          pointHitRadius: 16,
        },
        {
          label: "More data",
          backgroundColor: '#ffa38f',
          borderColor: '#ffa38f',
          data: [2,5,4,7,5,4,5, 5]
        }
      ]
  }

  public myActivityDataMonth: ChartData<'line'> = {
    labels: ["Mon", "Tue", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Income",
        backgroundColor: '#8eefca',
        borderColor: '#8eefca',
        data: [2,1,3,2,1,3,2],
        pointHitRadius: 16,
      },
      {
        label: "More data",
        backgroundColor: '#ffa38f',
        borderColor: '#ffa38f',
        data: [6,4,2,5,1,2,6]
      }
    ]
  }

  public myActicityOptions: ChartConfiguration<'line'>['options'] = {
    scales: {
      x: {
        grid: {
            display:false,
            circular: true,

        },
        ticks: {
          color: '#455964'
        }
      },
      y: {
        min: 1,
        max: 9,
        ticks: {
            stepSize: 1,
            color: '#455964'
        }
      },
  },
  // tension: 0.4,
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: '#455964'
      }
    },
    tooltip: {
      backgroundColor:'#fff',
      displayColors:false,
      titleColor: '#fff'
    },
  }
};


}
