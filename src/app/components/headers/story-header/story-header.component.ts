import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { nav_path } from '../../../app-routing.module';
import { dummyPost, Post } from '../../../utils/interfaces/post';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlogService } from '../../../services/blog.service';
import { NotificationService } from '../../../services/notification.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'anon-story-header',
  templateUrl: './story-header.component.html',
  styleUrls: ['./story-header.component.scss']
})
export class StoryHeaderComponent implements OnInit, OnDestroy {
  private unsub$: Subject<any> = new Subject<any>();
  nav_path = nav_path;
  user!: any;
  @Output() saveClicked = new EventEmitter<boolean>(false);

  constructor(
    private blogService: BlogService,
    private notify: NotificationService,
    private db: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.user.pipe(takeUntil(this.unsub$))
      .subscribe(user => { if (user) { this.user = user } else {
        this.router.navigate([nav_path.LOGIN])
          .then(() => this.notify.sendNotification('You must be signed in to create a post.'))
      } });
  }

  ngOnInit(): void {}

  savePost(isClicked: boolean) { this.saveClicked.emit(isClicked); }

  ngOnDestroy() { this.unsub$.next(); this.unsub$.complete(); }
}
