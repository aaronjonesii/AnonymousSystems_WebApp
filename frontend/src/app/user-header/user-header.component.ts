import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'anon-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit, OnDestroy {
  private unsub$: Subject<any> = new Subject<any>();
  isAuthenticated: boolean = false;
  userActions = [
    { title: 'Profile', link: '/profile', icon: 'settings-2-outline' },
    { title: 'Log Out', icon: 'unlock-outline' },
  ]
  showUserActions = false;

  constructor(
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    // isUserAuthenticated Subscriber
    this.authService.isUserAuthenticated$
      .pipe(takeUntil(this.unsub$))
      .subscribe((isAuthenticated) => this.isAuthenticated = isAuthenticated);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
