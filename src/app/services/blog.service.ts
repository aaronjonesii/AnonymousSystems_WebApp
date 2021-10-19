import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { nav_path } from '../app-routing.module';
import { Router } from '@angular/router';
import { dummyPost, Post } from '../utils/interfaces/post';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SlugifyPipe } from '../utils/pipes/slugify.pipe';

@Injectable({
  providedIn: 'root'
})
export class BlogService implements OnDestroy {
  private unsub$: Subject<any> = new Subject<any>();

  private _liveStory = new BehaviorSubject<any>(dummyPost);
  private _lastSavedStory = new BehaviorSubject<any>(dummyPost);
  private _autoSaveStatus = new BehaviorSubject<any>('');
  private _storyLoaded = new BehaviorSubject<any>('');
  private _storyLastSavedTimestamp = new BehaviorSubject<any>('');

  sharedLiveStory = this._liveStory.asObservable();
  sharedLastSavedStory = this._lastSavedStory.asObservable();
  sharedAutoSaveStatus = this._autoSaveStatus.asObservable();
  sharedStoryLoaded = this._storyLoaded.asObservable();
  sharedStoryLastSavedTimestamp = this._storyLastSavedTimestamp.asObservable();

  private domparser = new DOMParser();

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private authService: AuthService,
    private notify: NotificationService,
    private router: Router,
    private slugifyPipe: SlugifyPipe,
  ) { }

  updateLiveStory(story: any) { this._liveStory.next(story); };
  updateLastSavedStory(story: any) { this._lastSavedStory.next(story); };
  updateAutoSaveStatus(status: string) { this._autoSaveStatus.next(status); };
  updateStoryLoaded(isStoryLoaded: boolean) { this._storyLoaded.next(isStoryLoaded); };
  updateStoryLastSavedTimestamp(storyLastSavedTimestamp: number) {
    this._storyLastSavedTimestamp.next(storyLastSavedTimestamp);
  };

  public filterStoryContentMarkUp(story: Post) {
    const htmlString = story.content;
    const domDoc = this.domparser.parseFromString(htmlString, 'text/html')
    let storyMarkUp = htmlString;
    // Remove Title
    if(domDoc.getElementsByTagName("h1").length > 0) {
      storyMarkUp = storyMarkUp.replace(domDoc.getElementsByTagName("h1")[0].outerHTML, '');
    }
    // Remove Subtitle(Byline)
    if(domDoc.getElementsByClassName('ck-subtitle').length > 0) {
      storyMarkUp = storyMarkUp.replace(domDoc.getElementsByClassName('ck-subtitle')[0].outerHTML, '');
    }
    return storyMarkUp
  }

  public parseEditorContent(editor: any, story: Post, storyWordCount: number) {
    const htmlString = editor.getData();
    const domDoc = this.domparser.parseFromString(htmlString, 'text/html')
    story.content = htmlString;
    // Set Title
    if(domDoc.getElementsByTagName("h1").length > 0) {
      story.title = domDoc.getElementsByTagName("h1")[0].innerText;
      story.slug = this.slugifyPipe.transform(domDoc.getElementsByTagName("h1")[0].innerText);
    }
    // Set Subtitle(Byline)
    if(domDoc.getElementsByClassName('ck-subtitle').length > 0) {
      let byline: any;
      byline = domDoc.getElementsByClassName('ck-subtitle')[0].textContent;
      story.byline = byline;
    }
    let actual_read_time = storyWordCount / 200;
    let whole_read_time = ~~(actual_read_time);
    if (whole_read_time<=0) whole_read_time = 1;
    story.read_time = whole_read_time;
    return story;
  }

  /**
   * CREATE POST
   * Permissions: create(write)
   *  Allow authenticated users
   *  @param: Post
   *  TODO: Create Cloud Function to add postID and date_added fields
   */
  createPost(post: Post) {
    if (this.authService.isLoggedIn) {
      this.db.collection('posts').add(post).then((post) => {
        this.router.navigate([nav_path.BLOG_POST, post.id])
          .then(() => {return})
      })
    } else {
      this.router.navigate([nav_path.LOGIN])
        .then(() => this.notify.sendNotification('You must be logged in to create a post'))
        .catch(error => {
          this.notify.sendNotification('Something went wrong creating the post')
          console.error(error);
        })
    }
  }

  /**
   * GET POST
   * Permissions: get(read)
   *  Allow one of (owner, writer, commenter, or viewer) or if post is public
   *  @param: string
   */
  getPost(postID: string) {
    this.db.collection('posts').doc(postID).valueChanges().pipe(takeUntil(this.unsub$))
      .subscribe((post) => {
        return post
      })
  }

  /**
   * LIST POSTS
   * Permissions: list(read)
   *  Allow one of (owner, writer, commenter, or viewer) or if post is public
   */
  getPosts() {
    this.db.collection('posts').valueChanges().pipe(takeUntil(this.unsub$))
      .subscribe((posts) => {
        return posts
      })
  }

  /**
   * UPDATE POST
   * Permissions: update(write)
   *  Allow one of (owner, writer)
   *  @param: Post
   */
  updatePost(post: Post) {
    this.db.collection('posts').doc(post.id).update(post)
      .then(() => {this.notify.sendNotification('✅ Post updated')})
      .catch(error => {
        this.notify.sendNotification('Something went wrong updating the post')
        console.error(error);
      })
  }

  /**
   * DELETE POST
   * Permissions: delete(write)
   *  Allow owner
   *  @param: string
   *  TODO: Create Cloud Function to move post to trashed collection
   */
  trashPost(postID: string) {
    this.db.collection('posts').doc(postID).delete()
      .then(() => {
        this.notify.sendNotification('✅ Successfully trashed post')
      })
      .catch(error => {
        this.notify.sendNotification('Something went wrong trashing the post')
        console.error(error);
      })
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
