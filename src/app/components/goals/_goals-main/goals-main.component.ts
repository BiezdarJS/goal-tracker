import { AfterViewChecked, AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
// Components
import { NewGoalComponent } from '../new-goal/new-goal.component';
import { GoalsGridComponent } from '../goals-grid/goals-grid.component';
// Enums
import { GoalsViewType } from 'src/app/enums/goals.view-type';
// Directives
import { NewGoalDirective } from 'src/app/directives/goals/new-goal.directive';
// Services
import { GoalsService } from 'src/app/services/goals/goals.service';
import { GoalsNotificationsService } from 'src/app/services/goals/goals-notifications.service';



@Component({
  selector: 'gt-goals-main',
  templateUrl: './goals-main.component.html',
  host: {'class': 'goals-main'},
  styleUrls: ['./goals-main.component.scss']
})
export class GoalsMainComponent implements AfterViewInit, AfterViewChecked {

  @ViewChild(NewGoalDirective, {read: ViewContainerRef, static:true})
  gtNewGoalHost!: ViewContainerRef;
  @ViewChild('actionsNav') actionsNav: any;
  @ViewChild('goalsGrid') goalsGrid: any;
  selectCategoryValue!: string;
  selectDateValue!: string;
  goalsViewType!:string;
  public get GoalsViewType() {
    return GoalsViewType;
  }


  constructor(
    private goalsService: GoalsService,
    private goalsNotificationsS: GoalsNotificationsService
  ) {}

  ngOnInit():void {
    this.goalsNotificationsS.activeGoalsViewType.subscribe(d => {
      this.goalsViewType = d;
    });
  }

  ngAfterViewInit(): void {
    this.selectCategoryValue = this.actionsNav.select_category.nativeElement.value;
    this.selectDateValue = this.actionsNav.select_date.nativeElement.value;
    this.goalsGrid.selectCategoryValue = this.selectCategoryValue;
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
    this.gtNewGoalHost.remove();
    setTimeout(() => {
      this.gtNewGoalHost.createComponent(GoalsGridComponent);
    },50);
  }

}
