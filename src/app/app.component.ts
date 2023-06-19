import { Component, ElementRef, OnInit } from '@angular/core';
import { SetThemeService } from './services/set-theme.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/login/auth.service';
import { Router } from '@angular/router';

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
    private setThemeService: SetThemeService,
    private authService: AuthService,
    router: Router
  ) {
    if (!authService.isLoggedIn()) {
      router.navigate(['sign-in']);
    }
  }


  ngOnInit():void {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }


}
