import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { NotificationService } from '../../../services/notification.service';
import { dummyPost, Post } from '../../../utils/interfaces/post';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { takeUntil } from 'rxjs/operators';
import { nav_path } from '../../../app-routing.module';
import firebase from 'firebase/compat';
import User = firebase.User;
import { BlogService } from '../../../services/blog.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'anon-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit, OnDestroy {
  private unsub$: Subject<any> = new Subject<any>();
  isLoading = true;
  story: Post = dummyPost;

  storyLastSavedTimestamp!: number;
  changes = 0;

  storyCharacterCount: number = 0;
  storyWordCount: number = 0;
  editorConfig = {
    title: { placeholder: 'Title' },
    placeholder: 'Tell your story...',
    wordCount: {
      onUpdate: (stats:any) => {
        this.storyCharacterCount = stats.characters;
        this.storyWordCount = stats.words;
      },
    },
  };

  constructor(
    private notify: NotificationService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private blogService: BlogService,
    private db: AngularFirestore,
    private localStorage: LocalStorageService,
  ) {
    this.afAuth.user.pipe(takeUntil(this.unsub$))
      .subscribe(user => {
        if (user) { this.story.roles[user.uid] = "owner"; } else {
          this.router.navigate([nav_path.LOGIN])
          .then(() => this.notify.sendNotification('🔒 Not Signed In'))
        }
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    // Check if story is in local storage
    let localStory = this.localStorage.loadPostCookie();
    if (localStory) {
      this.story = JSON.parse(localStory);
      this.notify.sendNotification('Found unsaved local story');
    }
  }

  onSave(event: boolean) {
    this.savePost(this.story);
    // console.log(this.story);
  }

  public onChange({editor}: ChangeEvent ) {
    let story = this.blogService.parseEditorContent(editor, this.story, this.storyWordCount);
    this.localStorage.setPostCookie(story);
  };

  savePost(story: Post) {
    this.localStorage.removePostCookie();
    this.db.collection('posts').add(story)
      .then(createdPost => this.router.navigate([nav_path.BLOG_POST, createdPost.id]))
      .catch(error => {
        this.notify.sendNotification('Error occurred creating the blog post.');
        console.error(error);
      })
  }

  ngOnDestroy() { this.unsub$.next(); this.unsub$.complete(); }
}
