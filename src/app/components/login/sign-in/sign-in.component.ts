import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Services
import { AuthService } from 'src/app/services/login/auth.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { NameNotificationService } from 'src/app/services/login/name-notification.service';

@Component({
  selector: 'gt-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public imagesURL: string = '';
  signinForm!: FormGroup;
  isSubmitted = false;
  // Name
  welcomeName!:any;

  constructor(
    private globalVars: GlobalVariablesService,
    private authService: AuthService,
    private nameNotificationS: NameNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit():void {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      your_name: ['', Validators.required]
    });
    this.imagesURL = this.globalVars.imagesURL;

  }

  get yourName() {
    return this.signinForm.get('your_name');
  }


  signIn() {
    this.isSubmitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    this.nameNotificationS.setName(this.signinForm.value.your_name);
    this.authService.signIn(this.signinForm.value);
  }

}
