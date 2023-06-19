import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
// Models
import { User } from 'src/app/models/user.model';
// Services
import { UserService } from 'src/app/services/settings/user.service';


@Component({
  selector: 'gt-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  newUser!: User;

  constructor(
    private userService: UserService
  ) {}


  // FORM
  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.newUser = new User(
      form.value.username,
      form.value.password,
      form.value.email,
      form.value.phone
    );

    // await this.userService.postUser(this.newUser);
  }

}
