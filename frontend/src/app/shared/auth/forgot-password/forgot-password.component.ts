import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'anon-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpassForm = this.fb.group({email: ['',  [Validators.required, Validators.email]]});

  constructor(
    public authService: AuthService,
    private notify: NotificationService,
    private fb: FormBuilder,
  ) { }

  get email() { return this.forgotpassForm.get('email'); }

  ngOnInit(): void {}

  onSubmit() {
    // this.notify.sendNotification(JSON.stringify(this.forgotpassForm.value))
    this.authService.ForgotPassword(this.forgotpassForm.value.email);
  }

}
