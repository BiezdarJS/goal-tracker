import { AfterContentChecked, AfterViewChecked, Component, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SetThemeService } from 'src/app/services/set-theme.service';


@Component({
  selector: 'gt-goal-tracker',
  templateUrl: './goal-tracker.component.html',
  host: {'class': 'goal-and-time-management'},
  styleUrls: ['./goal-tracker.component.scss']
})
export class GoalTrackerComponent implements OnInit, OnDestroy, AfterViewChecked, AfterContentChecked {

  themeName!: string | null;
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private setThemeService: SetThemeService,
    private elRef: ElementRef
  ) {}


  ngOnInit():void {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
    if (this.themeName === null) {
      this.setThemeService.setTheme('theme-dark');
    }
    // console.log(this.themeName);
    // document.body.classList.add('test');
    document.body.classList.add(''+this.themeName+'');
  }

  ngAfterViewChecked():void {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(''+this.themeName+'');
  }
  ngAfterContentChecked():void {
    // this.elRef.nativeElement.classList.add(this.themeName);
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
