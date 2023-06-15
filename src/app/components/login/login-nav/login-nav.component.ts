import { Component } from '@angular/core';
// Services
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'gt-login-nav',
  templateUrl: './login-nav.component.html',
  styleUrls: ['./login-nav.component.scss']
})
export class LoginNavComponent {

  imagesURL:any;

  constructor(
    private globalVars: GlobalVariablesService,
  ) {

  }

  ngOnInit() {
    this.imagesURL = this.globalVars.imagesURL;
  }

}
