import { Component } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { chartColors } from '../charts.config';
import { textInCenterWithLineBreak } from '../utils';

@Component({
  selector: 'gt-health-and-sports-chart',
  templateUrl: './health-and-sports-chart.component.html',
  styleUrls: ['./health-and-sports-chart.component.scss']
})
export class HealthAndSportsChartComponent {


  public healthAndSportsData: ChartData<'bar'> = {
    labels: ["<  1", "1 - 2", "3 - 4", "5 - 9", "10 - 14", "15 - 19", "20 - 24", "25 - 29", "> - 29"],
    datasets: [{
      label: 'Employee',
      backgroundColor: chartColors.blue,
      data: [12, 59, 5, 56, 58, 12, 59, 87, 45]
    }, {
      label: 'Engineer',
      backgroundColor: chartColors.green,
      data: [12, 59, 5, 56, 58, 12, 59, 85, 23]
    }, {
      label: 'Government',
      backgroundColor: chartColors.yellow,
      data: [12, 59, 5, 56, 58, 12, 59, 65, 51]
    }, {
      label: 'Political parties',
      backgroundColor: chartColors.red,
      data: [12, 59, 5, 56, 58, 12, 59, 12, 74]
    }]
  };

  public healthAndSportsOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        beginAtZero: true,
        stacked: true,
        ticks: {
          color: localStorage.getItem('theme') === 'theme-light' ? '#455964' : '#fff'
        }
      },
      y: {
        stacked: true,
        type: 'linear',
        ticks: {
          color: '#455964'
        }
      }
    },
    events: [],
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#455964'
        }
      },

    }
  };


}
