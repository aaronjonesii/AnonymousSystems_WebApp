import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../../services/auth.service';
import { nav_path } from '../../../../app-routing.module';
import { MatMenuTrigger } from '@angular/material/menu';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { trace } from '@angular/fire/compat/performance';

@Component({
  selector: 'anon-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit, OnDestroy {
  private unsub$: Subject<any> = new Subject<any>();
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  isAuthenticated: boolean = false;
  nav_path = nav_path;

  constructor(
    public authService: AuthService,
    ) { }

  openMenu() {
    console.log('clicked');
    this.trigger.openMenu();
  }

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
