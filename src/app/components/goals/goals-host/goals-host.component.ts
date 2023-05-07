import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NewGoalDirective } from 'src/app/directives/goals/new-goal.directive';
import { NewGoalComponent } from '../new-goal/new-goal.component';


@Component({
  selector: 'gt-goals-host',
  templateUrl: './goals-host.component.html',
  styleUrls: ['./goals-host.component.scss']
})
export class GoalsHostComponent {

  @ViewChild(NewGoalDirective, {read: ViewContainerRef, static:true})
  gtNewGoalHost!: ViewContainerRef;

  createNewGoal() {
    this.gtNewGoalHost.createComponent(NewGoalComponent);
  }

}
