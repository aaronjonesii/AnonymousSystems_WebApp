import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notification$ = new BehaviorSubject<string>('')
  public notification$ = this._notification$.asObservable();

  constructor() { }

  sendNotification(message: string) {this._notification$.next(message); }
}
