import { Component } from '@angular/core';
import { GlobalConstants } from 'src/app/_utils/global-constants';

@Component({
  selector: 'gt-sidenav',
  templateUrl: './sidenav.component.html',
  host: { 'class': 'sidenav'},
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public imagesURL: string = '';

  constructor() {
    this.imagesURL = location.href + GlobalConstants.imagesURL;
  }

}
