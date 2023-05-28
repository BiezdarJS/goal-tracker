import { AfterViewChecked, Component, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SetThemeService } from 'src/app/services/set-theme.service';


@Component({
  selector: 'gt-goal-tracker',
  templateUrl: './goal-tracker.component.html',
  host: {'class': 'goal-and-time-management'},
  styleUrls: ['./goal-tracker.component.scss']
})
export class GoalTrackerComponent implements OnInit, OnDestroy {

  themeName!: string | null;
  subscription!: Subscription;

  constructor(
    private setThemeService: SetThemeService,
    private elRef: ElementRef
  ) {}


  ngOnInit():void {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
    console.log(this.themeName);
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
