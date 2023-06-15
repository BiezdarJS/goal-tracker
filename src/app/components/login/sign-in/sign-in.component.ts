import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Services
import { AuthService } from 'src/app/services/login/auth.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'gt-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public imagesURL: string = '';
  signinForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private globalVars: GlobalVariablesService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit():void {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.imagesURL = this.globalVars.imagesURL;
  }

  get username() {
    return this.signinForm.get('username');
  }
  get password() {
    return this.signinForm.get('password');
  }

  signIn() {
    this.isSubmitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    this.authService.signIn(this.signinForm.value);
  }

}
