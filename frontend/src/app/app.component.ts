import { Component, Injector, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { filter, skip } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { UrlService } from './services/url.service';


@Component({
  selector: 'anon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  previousUrl!: string;
  currentUrl!: string;

  constructor(
    public authService: AuthService,
    injector: Injector,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private urlService: UrlService,
  ) {
    this.start_notification_service_subscription();

    this.authService.setUserAuthenticationStatus(this.authService.isLoggedIn);
  }

  ngOnInit() {
    // Store previousUrl w/URL Service Subscription
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(
      (event: any) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.urlService.setPreviousUrl(this.previousUrl);
      }
    );
  }

  // Send notification as popup
  start_notification_service_subscription() {
    this.notificationService.notification$.pipe(
      skip(1) // skip initial message from setup
    ).subscribe((message) => {
      if (message != '') {
        this._snackBar.open(message, 'Dismiss')
      }
    })
  }

}
