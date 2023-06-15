import { AfterViewChecked, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetThemeService } from 'src/app/services/set-theme.service';

@Component({
  selector: 'gt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {

  themeName!: string | null;

  constructor(
    private route: ActivatedRoute,
    private setThemeService: SetThemeService,
    private elRef: ElementRef
  ) {}

  ngOnInit():void {
    this.setThemeService.activeTheme.subscribe(themeName => this.themeName = themeName);
    if (this.themeName === null) {
      this.setThemeService.setTheme('theme-dark');
    }
    document.body.classList.add(''+this.themeName+'');
  }

  ngAfterViewChecked():void {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(''+this.themeName+'');
  }


}
