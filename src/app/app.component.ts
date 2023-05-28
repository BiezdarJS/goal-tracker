import { Component, ElementRef, OnInit } from '@angular/core';
import { SetThemeService } from './services/set-theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'goal-tracker';
  themeName!: string | null;
  subscription!: Subscription;

  constructor(
    private elRef: ElementRef,
    private setThemeService: SetThemeService
  ) {}


  ngOnInit():void {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName)
    // this.themeName = localStorage.getItem('theme');
    // if (this.themeName) {
    //   this.elRef.nativeElement.classList.add(this.themeName);
    // }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
