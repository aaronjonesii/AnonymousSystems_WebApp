import { Injectable } from '@angular/core';
import { LocalStorageRefService } from './local-storage-ref.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private _localStorage: Storage;

  private _consent_for_cookies$ = new BehaviorSubject<any>(null)
  public consent_for_cookies$ = this._consent_for_cookies$.asObservable()

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = _localStorageRefService.localStorage;
    this.loadCookie();
  }

  setCookie(data: string) {
    this._localStorage.setItem('accepts_cookies', data)
    this._consent_for_cookies$.next(data)
  }

  loadCookie() {
    const data = this._localStorage.getItem('accepts_cookies')
    this._consent_for_cookies$.next(data)
  }

  clearAllLocalStorage() {
    this._localStorage.clear()
    this._consent_for_cookies$.next(null)
  }


}
