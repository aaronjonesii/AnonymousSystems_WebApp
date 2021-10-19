import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { dummyPost } from '../../../utils/interfaces/post';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalStorageService } from '../../../services/local-storage.service';
import { BlogService } from '../../../services/blog.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotificationService } from '../../../services/notification.service';
import { nav_path } from '../../../app-routing.module';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'anon-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.scss']
})
export class StoryPageComponent implements OnInit, OnDestroy {
  private unsub$: Subject<any> = new Subject<any>();
  storyLoaded = false;
  story = dummyPost;
  storyMarkup = '';
  isAuthenticated = false;
  userData!: any;

  storyCharacterCount: number = 0;
  storyWordCount: number = 0;
  editorConfig = {
    wordCount: {
      onUpdate: (stats:any) => {
        this.storyCharacterCount = stats.characters;
        this.storyWordCount = stats.words;
      }
    },
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: AngularFirestore,
    private localStorage: LocalStorageService,
    private blogService: BlogService,
    private afAuth: AngularFireAuth,
    private notify: NotificationService,
    private router: Router,
    private auth: AuthService,
  ) {
    // Get Story ID from URL
    this.activatedRoute.params.pipe(takeUntil(this.unsub$)).subscribe(
      routeParams => {
        this.db.collection('posts').doc(routeParams.postID).valueChanges()
          .pipe(takeUntil(this.unsub$))
          .subscribe(
            (story: any) => {
              this.story = story;
              this.storyMarkup = this.blogService.filterStoryContentMarkUp(this.story);
              this.storyLoaded = true;
            },
            error => console.error(error),
          )
      },
      error => console.error(error),
    );

    this.auth.isUserAuthenticated$.pipe(takeUntil(this.unsub$))
      .subscribe(isUserAuthenticated => this.isAuthenticated = isUserAuthenticated);
    this.auth.userData$.pipe(takeUntil(this.unsub$))
      .subscribe(userDataRef => this.userData = userDataRef);
  }

  ngOnInit(): void {}

  ngOnDestroy() { this.unsub$.next(); this.unsub$.complete(); }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'e') {
      if (this.isAuthenticated) {
        // If user is a owner or write of the post
        if (["owner", "writer"].includes(this.story.roles[this.userData.uid])) {
          this.router.navigate([nav_path.BLOG_POST, this.story.id, 'edit']);
        }
      }
    }
  }
}
