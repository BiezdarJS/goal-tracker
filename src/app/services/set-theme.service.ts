import { Injectable } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { chartColors } from '../components/charts/charts.config';

@Injectable()
export class SetThemeService {



  public activeThemeSource: BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('theme'));
  activeTheme = this.activeThemeSource.asObservable();
  colors!: any;


  setTheme(themeName:string) {
    localStorage.setItem('theme', themeName);
    this.activeThemeSource.next(themeName);
    this.colors = localStorage.getItem('theme') === 'theme-light' ? chartColors.themeLight : chartColors.themeDark;
	}

  toggleTheme() {
		if (localStorage.getItem('theme') === 'theme-dark') {
			this.setTheme('theme-light');
		} else {
			this.setTheme('theme-dark');
		}
	}


}
