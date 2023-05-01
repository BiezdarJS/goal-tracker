import { AfterViewInit, Component } from '@angular/core';
import { GlobalConstants } from 'src/app/_utils/global-constants';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'gt-sidenav',
  templateUrl: './sidenav.component.html',
  host: { 'class': 'sidenav'},
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterViewInit {

  public imagesURL: string = '';

  constructor(
    private locationStrategy: LocationStrategy
  ) {

    this.imagesURL = this.locationStrategy.getBaseHref() + '/' + GlobalConstants.imagesURL;
  }

  ngAfterViewInit() {
    console.log();
  }

}
