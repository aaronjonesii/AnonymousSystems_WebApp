import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Injectable()
export class UrlService {
  private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();

  constructor(
    private router: Router,
    private location: Location,
    ) { }

  setPreviousUrl(previousUrl: string) {
    this.previousUrl.next(previousUrl);
  }

  public goBack() { this.location.back(); }

}
