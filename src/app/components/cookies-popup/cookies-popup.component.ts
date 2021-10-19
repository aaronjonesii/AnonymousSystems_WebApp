import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'anon-cookies-popup',
  templateUrl: './cookies-popup.component.html',
  styleUrls: ['./cookies-popup.component.scss']
})
export class CookiesPopupComponent implements OnInit, OnDestroy {
  private unsub$: Subject<any> = new Subject<any>();
  hide_google_cookies_consent = false;
  google_cookies_consent_status = this._localStorageService.consent_for_cookies$;

  constructor(
    private _localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.check_google_cookie_consent();
  }

  check_google_cookie_consent() {
    this.google_cookies_consent_status.pipe(takeUntil(this.unsub$)).subscribe((status) => {
      if (status === 'true') { this.hide_google_cookies_consent = true; } else {this.hide_google_cookies_consent = false; }
    } )
  }

  accept_google_cookies_consent() { this._localStorageService.setCookie('true') }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
