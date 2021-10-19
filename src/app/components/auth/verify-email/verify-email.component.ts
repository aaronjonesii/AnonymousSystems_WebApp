import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { nav_path } from '../../../app-routing.module';

@Component({
  selector: 'anon-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  nav_path = nav_path;

  constructor(
    public authService: AuthService,
  ) { }

}
