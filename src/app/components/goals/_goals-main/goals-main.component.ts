import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
import { GoalsHostDirective } from 'src/app/directives/goals/goals-host.directive';



@Component({
  selector: 'gt-goals-main',
  templateUrl: './goals-main.component.html',
  host: {'class': 'goals-main'},
  styleUrls: ['./goals-main.component.scss']
})
export class GoalsMainComponent implements OnInit, AfterViewInit, AfterViewChecked {

  // Dynamic components
  @ViewChild(GoalsHostDirective, {static: true}) goalsHost!: GoalsHostDirective;
  @ViewChild(NewGoalDirective, {static:true}) newGoalHost!: NewGoalDirective;
  goalsContainerRef!:any;
  newGoalContainerRef!:any;
  // Reference
  @ViewChild('actionsNav') actionsNav: any;
  @ViewChild('goalsGrid') goalsGrid: any;
  // Values for goal filter
  selectCategoryValue!: string;
  selectDateValue!: string;
  // Other
  public get GoalsViewType() {
    return GoalsViewType;
  }
  filterBtnHasBeenFired!:boolean;


  constructor(
    private goalsService: GoalsService,
    private goalsNotificationsS: GoalsNotificationsService
  ) {}

  ngOnInit():void {
    // Initialize Host Containers
    this.goalsContainerRef = this.goalsHost.viewContainerRef;
    this.newGoalContainerRef = this.newGoalHost.viewContainerRef;
    // Subscribe to Filter Button Event
    this.goalsNotificationsS.filterBtnHasBeenFired.subscribe(d => {
      this.filterBtnHasBeenFired = d;
    });
    // Create Initial Grid
    this.createGoalsGrid();
  }


  ngAfterViewInit(): void {

    // Collect initial Select Data
    this.selectCategoryValue = this.actionsNav.select_category.nativeElement.value;
    this.selectDateValue = this.actionsNav.select_date.nativeElement.value;
  }

  ngAfterViewChecked() {
    this.selectCategoryValue = this.actionsNav.select_category.nativeElement.value;
    this.selectDateValue = this.actionsNav.select_date.nativeElement.value;
  }

  // Goals Grid methods
  createGoalsGrid() {
    this.goalsContainerRef.createComponent(GoalsGridComponent);
  }
  refreshGoalsGrid() {
    this.goalsContainerRef.clear();
    this.goalsContainerRef.createComponent(GoalsGridComponent);
  }


  // New Goal methods
  createNewGoal() {
    this.newGoalContainerRef.createComponent(NewGoalComponent);
  }
  removeNewGoal() {
    this.newGoalContainerRef.clear();
    this.goalsService.components = [];
  }


}
