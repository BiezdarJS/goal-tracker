import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
// Services
import { AuthService } from 'src/app/services/login/auth.service';
import { NameNotificationService } from 'src/app/services/login/name-notification.service';
import { SetThemeService } from 'src/app/services/set-theme.service';

@Component({
  selector: 'gt-header',
  templateUrl: './header.component.html',
  host: { 'class': 'header' },
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('checkbox') checkbox!: ElementRef;
  themeName!: string | null;
  // Welcome Name
  welcomeName!:any;

  constructor(
    private authService: AuthService,
    private setThemeService: SetThemeService,
    private nameNotificationS: NameNotificationService,
  ) {}

		// function to set a given theme/color-scheme


	// function to toggle between light and dark theme

  ngOnInit():void {
    this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
    // Welcome Name
    this.welcomeName = sessionStorage.getItem('welcome-name');
  }




  ngAfterViewInit():void {
    if (sessionStorage.getItem('theme') === 'theme-dark') {
      this.checkbox.nativeElement.checked = true;
    } else {
      this.checkbox.nativeElement.checked = false;
    }
  }

  toggleTheme() {
    this.setThemeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
  }


  ngOnDestroy() {
  }

}
