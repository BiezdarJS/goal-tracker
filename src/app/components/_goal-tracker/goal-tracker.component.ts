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





}
