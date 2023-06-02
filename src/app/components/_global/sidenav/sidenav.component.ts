import { AfterViewInit, Component } from '@angular/core';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';


@Component({
  selector: 'gt-sidenav',
  templateUrl: './sidenav.component.html',
  host: { 'class': 'sidenav'},
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public imagesURL: string = '';

  constructor(
    private globalVars: GlobalVariablesService,
  ) {


  }

  ngOnInit():void {
    this.imagesURL = this.globalVars.imagesURL;
  }


  closeMobileMenu() {

  }

}
