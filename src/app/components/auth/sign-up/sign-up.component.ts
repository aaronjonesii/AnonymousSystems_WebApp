import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { Validators } from '@angular/forms';
import { nav_path } from '../../../app-routing.module';

@Component({
  selector: 'anon-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm = this.fb.group({
    email: ['',  [Validators.required, Validators.email]],
    password: ['',  [Validators.required, Validators.minLength(8)]],
  });
  nav_path = nav_path;

  constructor(
    public authService: AuthService,
    private notify: NotificationService,
    private fb: FormBuilder,
  ) { }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  onSubmit() {
    // this.notify.sendNotification(JSON.stringify(this.signupForm.value));
    this.authService.signUp(this.signupForm.value.email, this.signupForm.value.password);
  }

}
