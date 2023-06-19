import { Injectable } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { chartColors } from '../components/charts/charts.config';

@Injectable()
export class SetThemeService {



  public activeThemeSource: BehaviorSubject<string | null> = new BehaviorSubject(sessionStorage.getItem('theme'));
  activeTheme = this.activeThemeSource.asObservable();
  colors!: any;


  setTheme(themeName:string) {
    sessionStorage.setItem('theme', themeName);
    this.activeThemeSource.next(themeName);
    this.colors = sessionStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;
	}

  toggleTheme() {
		if (sessionStorage.getItem('theme') === 'theme-dark') {
			this.setTheme('theme-light');
		} else {
			this.setTheme('theme-dark');
		}
	}


}
