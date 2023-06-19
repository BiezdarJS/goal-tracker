import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// Components
import { InfoPopupComponent } from '../_info-popup/info-popup.component';
// Directives
import { InfoPopupHostDirective } from 'src/app/directives/info/info-popup-host.directive';
// Services
import { SetThemeService } from 'src/app/services/set-theme.service';



@Component({
  selector: 'gt-goal-tracker',
  templateUrl: './goal-tracker.component.html',
  host: {'class': 'goal-and-time-management'},
  styleUrls: ['./goal-tracker.component.scss']
})
export class GoalTrackerComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  themeName!: string | null;
  subscription!: Subscription;
  // Info Pupup
  @ViewChild(InfoPopupHostDirective, {static:true}) infoPopupHost!: InfoPopupHostDirective;
  infoContainerRef!:any;
  // Session Storage
  welcomeMessage!:any;


  constructor(
    private route: ActivatedRoute,
    private setThemeService: SetThemeService,
    private elRef: ElementRef
  ) {}


  ngOnInit():void {
    // Session Storage
    this.welcomeMessage = sessionStorage.getItem('welcome-message');
    // Set Active Theme
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
    if (this.themeName === null) {
      this.setThemeService.setTheme('theme-dark');
    }
    document.body.classList.add(''+this.themeName+'');
  }

  ngAfterViewInit():void {
    // Info Pupup
    this.infoContainerRef = this.infoPopupHost.viewContainerRef;
    // Initialize
    if (this.welcomeMessage !== 'accepted') {
      setTimeout(() => {
        this.openInfoPopup();
      }, 5000);
    }
  }

  ngAfterViewChecked():void {
    // Update Active Theme
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(''+this.themeName+'');
  }


  openInfoPopup() {
    this.infoContainerRef.createComponent(InfoPopupComponent);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
