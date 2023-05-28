import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
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
  subscription!: Subscription;

  constructor(
    private setThemeService: SetThemeService,
    private elRef: ElementRef
  ) {}

		// function to set a given theme/color-scheme


	// function to toggle between light and dark theme

  ngOnInit():void {
    this.subscription = this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit():void {
    if (localStorage.getItem('theme') === 'theme-dark') {
      this.checkbox.nativeElement.checked = true;
    } else {
      this.checkbox.nativeElement.checked = false;
    }
  }

  toggleTheme() {
    this.setThemeService.toggleTheme();
  }


}
