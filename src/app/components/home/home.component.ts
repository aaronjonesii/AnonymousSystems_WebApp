import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { dummyPost, Post } from '../../utils/interfaces/post';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { NotificationService } from '../../services/notification.service';
import { BlogService } from '../../services/blog.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { takeUntil } from 'rxjs/operators';
import { where } from '@angular/fire/firestore';
import { nav_path } from '../../app-routing.module';

@Component({
  selector: 'anon-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  private unsub$: Subject<any> = new Subject<any>();
  nav_path = nav_path;
  pageLoaded = false;
  HOME_PAGE_TITLE = 'Anonymous Cybersecurity';
  tags = [
    'Technology',
    'Future',
    'Health',
    'Science',
    'Business',
    'Work',
    'Culture',
    'Programming',
    'Design',
    'Productivity',
    'Cryptocurrency',
    'Artificial Intelligence',
    'Computers',
    'Operating Systems',
    'CyberSecurity',
  ];
  posts = [dummyPost, dummyPost];

  constructor(
    private notify: NotificationService,
    private blogService: BlogService,
    private db: AngularFirestore,
  ) {
      let postRef = this.db.collection('posts', ref => ref.where('public', '==', true));
      postRef.valueChanges().pipe(takeUntil(this.unsub$))
      .subscribe((publicPosts: any) => {
        this.posts = publicPosts;
        this.pageLoaded = true;
      });
  }

  ngOnDestroy() { this.unsub$.next(); this.unsub$.complete(); }
}
