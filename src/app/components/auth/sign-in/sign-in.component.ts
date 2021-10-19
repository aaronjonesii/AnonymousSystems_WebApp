import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { nav_path } from '../../../app-routing.module';

@Component({
  selector: 'anon-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm = this.fb.group({
    email: ['',  [Validators.required, Validators.email]],
    password: ['',  [Validators.required, Validators.minLength(8)]],
  });
  nav_path = nav_path;

  constructor(
    public authService: AuthService,
    private notify: NotificationService,
    private fb: FormBuilder,
  ) {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    // this.notify.sendNotification(JSON.stringify(this.loginForm.value))
    this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password);
  }

}
