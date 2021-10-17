import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'anon-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['',  [Validators.required, Validators.email]],
    password: ['',  [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    public authService: AuthService,
    private notify: NotificationService,
    private fb: FormBuilder,
  ) { }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {}

  onSubmit() {
    // this.notify.sendNotification(JSON.stringify(this.loginForm.value))
    this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password);
  }

}
