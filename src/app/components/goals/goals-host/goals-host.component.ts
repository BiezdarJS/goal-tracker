import { AfterViewChecked, AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NewGoalDirective } from 'src/app/directives/goals/new-goal.directive';
import { NewGoalComponent } from '../new-goal/new-goal.component';
import { GoalsService } from 'src/app/services/goals.service';
import { GoalsGridComponent } from '../goals-grid/goals-grid.component';


@Component({
  selector: 'gt-goals-host',
  templateUrl: './goals-host.component.html',
  host: {'class': 'goals-host'},
  styleUrls: ['./goals-host.component.scss']
})
export class GoalsHostComponent implements AfterViewInit, AfterViewChecked {

  @ViewChild(NewGoalDirective, {read: ViewContainerRef, static:true})
  gtNewGoalHost!: ViewContainerRef;
  @ViewChild('actionsNav') actionsNav: any;
  selectCategoryValue!: string;
  selectDateValue!: string;
  @ViewChild('goalsGrid') goalsGrid: any;

  constructor(
    private goalsService: GoalsService
  ) {}

  ngAfterViewInit(): void {
    this.selectCategoryValue = this.actionsNav.select_category.nativeElement.value;
    this.selectDateValue = this.actionsNav.select_date.nativeElement.value;
    this.goalsGrid.selectCategoryValue = this.selectCategoryValue;
    // console.log(this.goalsGrid.selectCategoryValue);
  }

  ngAfterViewChecked() {
    this.selectCategoryValue = this.actionsNav.select_category.nativeElement.value;
    this.selectDateValue = this.actionsNav.select_date.nativeElement.value;
  }

  createNewGoal() {
    this.gtNewGoalHost.createComponent(NewGoalComponent);
  }


  removeNewGoal() {
    this.gtNewGoalHost.remove();
    this.goalsService.components = [];
  }

  removeGoalsGrid() {
    // console.log(this.goalsGridHost);
    // pobierz wartoś z
    this.gtNewGoalHost.remove();
    setTimeout(() => {
      this.gtNewGoalHost.createComponent(GoalsGridComponent);
    },50);
  }

}
