import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { LocalStorageService } from './services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { skip } from 'rxjs/operators';
import { SnackbarComponent } from './snackbar/snackbar.component';


@Component({
  selector: 'anon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hide_google_cookies_consent = false;
  google_cookies_consent_status = this._localStorageService.consent_for_cookies$;

  constructor(
    private iconLibraries: NbIconLibraries,
    private _localStorageService: LocalStorageService,
    public snackBar: MatSnackBar,
    private notificationService: NotificationService,
  ) {
    this.start_notification_service_subscription();

    // Register FontAwesome Icons
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa', packClass: 'fa' }); // Version 4
    this.iconLibraries.registerFontPack('new-font-awesome', { iconClassPrefix: 'fa', packClass: 'fas' }); // Version 5

  }

  ngOnInit() {
    this.check_google_cookie_consent();
  }

  start_notification_service_subscription() {
    this.notificationService.notification$.pipe(skip(1)).subscribe((message) => {
      if (message != '') {
        // this.snackBar.open(message, "Dismiss", {duration: 10000, panelClass: 'snackBar'})
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: message,
          duration: 0,
          panelClass: 'snackBar'
        })
      }
    })
  }

  check_google_cookie_consent() {
    this.google_cookies_consent_status.subscribe((status) => {
      if (status === 'true') { this.hide_google_cookies_consent = true; } else {this.hide_google_cookies_consent = false; }
    } )
  }

  accept_google_cookies_consent() { this._localStorageService.setCookie('true') }

}
