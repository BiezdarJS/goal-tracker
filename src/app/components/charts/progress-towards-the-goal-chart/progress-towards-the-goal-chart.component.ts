import { Component, Input, OnInit} from '@angular/core';
import { Chart, ChartType, ChartConfiguration, ChartData } from 'chart.js/auto';

@Component({
  selector: 'gt-progress-towards-the-goal-chart',
  templateUrl: './progress-towards-the-goal-chart.component.html',
  host: {'class': 'progress-towards-the-goal-item__left'},
  styleUrls: ['./progress-towards-the-goal-chart.component.scss']
})
export class ProgressTowardsTheGoalChartComponent implements OnInit {

  @Input() progressTowardsTheGoalData!: ChartData<'doughnut'>; // <- note this line
  @Input() progressTowardsTheGoalType!: ChartType;
  @Input() progressTowardsTheGoalConfig!: ChartConfiguration<'doughnut'>['options'];



  ngOnInit():void {
    Chart.register({
      id: 'drawCirclePlugin',
      beforeDatasetsDraw: function beforeDatasetsDraw(chart:any, args:any, options:any) {
        var ctx = chart.ctx;
        var outerRadius = chart._metasets[0].data[0].outerRadius;
        var innerRadius = chart._metasets[chart._metasets.length - 1].data[0].innerRadius;
        var radiusLength = outerRadius - innerRadius;
        var x = chart.canvas.clientWidth / 2;
        var y = chart.canvas.clientHeight / 2 + 4;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, outerRadius - radiusLength / 2, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = options.backgroundColor || '#ddd';
        ctx.stroke();
      }
    });
  }





}
