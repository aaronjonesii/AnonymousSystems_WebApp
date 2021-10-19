import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { dummyPost, Post } from '../../../utils/interfaces/post';
import { nav_path } from '../../../app-routing.module';
import { takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BlogService } from '../../../services/blog.service';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { NotificationService } from '../../../services/notification.service';
import { UrlService } from '../../../services/url.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'anon-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  private unsub$: Subject<any> = new Subject<any>();
  nav_path = nav_path;
  previousUrl!: string;
  storyLoaded = false;

  story = dummyPost;
  storyLastSavedTimestamp!: number;
  lastSavedStory!: Post;
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
    private blogService: BlogService,
    private notify: NotificationService,
    private urlService: UrlService,
    private route: Router,
    private localStorage: LocalStorageService
  ) {
    // Get Story ID from URL
    this.activatedRoute.params.pipe(takeUntil(this.unsub$)).subscribe(
      routeParams => {
        this.db.collection('posts').doc(routeParams.postID).valueChanges()
          .pipe(takeUntil(this.unsub$))
          .subscribe(
            (post: any) => { this.story = post; this.storyLoaded = true; },
            error => console.error(error),
          )
      },
      error => console.error(error),
    );
  }

  ngOnInit(): void {}

  onSave(event: boolean) { this.updateStory(this.story); }

  updateStory(story: Post) {
    this.db.collection('posts').doc(story.id).update(story)
      .then(() => {
        this.route.navigate([nav_path.BLOG_POST, story.id])
      })
      .catch(error => console.error(error))
  }

  onChange( {editor}: ChangeEvent ) {
    let story = this.blogService.parseEditorContent(editor, this.story, this.storyWordCount);
    this.localStorage.setPostCookie(story);
  }

  putEditorInFocus(editor: CKEditorComponent | any) {
    setTimeout(() => {
      editor.editorInstance?.editing.view.focus();
      editor.editorInstance?.model.change(
        (writer: any) => writer.setSelection( writer.createPositionAt( editor.editorInstance?.model.document.getRoot(), 'end' ) )
      );
    }, 0);
  }

  ngOnDestroy() { this.unsub$.next(); this.unsub$.complete(); }
}
