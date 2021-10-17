import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'anon-cookies-popup',
  templateUrl: './cookies-popup.component.html',
  styleUrls: ['./cookies-popup.component.scss']
})
export class CookiesPopupComponent implements OnInit {
  hide_google_cookies_consent = false;
  google_cookies_consent_status = this._localStorageService.consent_for_cookies$;

  constructor(
    private _localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.check_google_cookie_consent();
  }

  check_google_cookie_consent() {
    this.google_cookies_consent_status.subscribe((status) => {
      if (status === 'true') { this.hide_google_cookies_consent = true; } else {this.hide_google_cookies_consent = false; }
    } )
  }

  accept_google_cookies_consent() { this._localStorageService.setCookie('true') }

}
