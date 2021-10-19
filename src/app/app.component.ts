import { Component, OnDestroy } from '@angular/core';
import { map, skip, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { trace } from '@angular/fire/compat/performance';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  private unsub$: Subject<any> = new Subject<any>();

  constructor(
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
  ) {
    this.start_notification_service_subscription();
    this.afAuth.authState.pipe(trace('auth'), map(u => !!u)).pipe(takeUntil(this.unsub$))
      .subscribe(isLoggedIn => {
        this.authService.setUserAuthenticationStatus(isLoggedIn);
    });

  }

  // Send notification as popup
  start_notification_service_subscription() {
    this.notificationService.notification$.pipe(
      skip(1) // skip initial message from setup
    ).pipe(takeUntil(this.unsub$)).subscribe((message) => {
      if (message != '') {
        this._snackBar.open(message, 'Dismiss')
      }
    })
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
