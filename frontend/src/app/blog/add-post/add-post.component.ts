import { Component, OnInit } from '@angular/core';
import { Post } from '../../shared/interfaces/post';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'anon-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  post: Post = {};
  userID: string | undefined;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private notify: NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  addPost(post: Post) {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.userID = user?.uid
      } else {this.notify.sendNotification('User not signed in!');return;}
    })
    this.db.collection('posts').add(post).then(
      newPost => {
        let newPostID = newPost.id;
        let newPostUpdates = {
          id: newPostID,
          author: this.userID,
          date_added: Date.now()
        }
        this.db.collection('posts').doc(newPostID)
          .update(newPostUpdates).then(() => {
          this.notify.sendNotification(`Added post: ${post.title}`);
          this.router.navigate(['/blog', 'post', newPostID]);
        });
      }
    );
  }

}
