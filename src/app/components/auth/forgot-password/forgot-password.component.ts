import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { nav_path } from '../../../app-routing.module';

@Component({
  selector: 'anon-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotpassForm = this.fb.group({email: ['',  [Validators.required, Validators.email]]});
  nav_path = nav_path;

  constructor(
    public authService: AuthService,
    private notify: NotificationService,
    private fb: FormBuilder,
  ) { }

  get email() { return this.forgotpassForm.get('email'); }

  onSubmit() {
    this.authService.forgotPassword(this.forgotpassForm.value.email);
  }

}
