import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'anon-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm = this.fb.group({
    email: ['',  [Validators.required, Validators.email]],
    password: ['',  [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    public authService: AuthService,
    private notify: NotificationService,
    private fb: FormBuilder,
  ) { }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  ngOnInit(): void {}

  onSubmit() {
    // this.notify.sendNotification(JSON.stringify(this.signupForm.value));
    this.authService.SignUp(this.signupForm.value.email, this.signupForm.value.password);
  }

}
