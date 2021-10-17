import { Component, OnInit } from '@angular/core';
import { Post } from '../../shared/interfaces/post';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'anon-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: Post = {
    id: '',
  };
  postSnapshot = {};

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private notify: NotificationService,
    private router: Router,
  ) {
    // Get post id from URL
    const postId = String(this.route.snapshot.paramMap.get('postID'));
    // Get blog post
    let postRef = this.db.collection('posts', ref => ref.where('id', '==', postId));
    postRef.valueChanges().subscribe((post: any) => {
      this.post = post[0];
      this.postSnapshot = post[0];
    })
  }

  ngOnInit(): void {}

  updatePost(post: Post) {
    // Update last updated date
    post.last_updated = Date.now();
    this.notify.sendNotification(`Update: ${JSON.stringify(post)}`);
    this.db.collection('posts').doc(post.id).update(post)
      .then(() => {});
  }
  deletePost(post: Post) {
    // Copy Post to trashed-posts
    // this.db.collection('trashed-posts').doc(post.id).set(post);

    // List comments in document
    // this.db.collection('posts').doc(post.id).collection('comments').valueChanges()
    //   .subscribe(comments => {
    //     // Loop through comments in collection
    //     if (comments.length > 0) {
    //       for (let comment of comments) {
    //         // Copy comment to trashed-posts
    //         this.db.collection('trashed-posts')
    //           .doc(post.id).collection('comments').doc(comment.id).set(comment)
    //           .then(() => {
    //             // Delete original comment
    //             this.db.collection('posts').doc(post.id).collection('comments').doc(comment.id).delete()
    //           })
    //
    //       }
    //       this.router.navigate(['/blog']);
    //     }
    //   });

    // Delete original document
    // this.db.collection('posts').doc(post.id).delete()
    //   .then(() => this.notify.sendNotification('Deleted post'));
    this.moveCollection(post, 'posts', 'comments', 'trashed-posts');
  }

  moveCollection(itemSnapshot: any, fromCollection: string, fromSubCollection: string, toCollection: string) {
    // Copy item fromCollection to toCollection
    this.db.collection(toCollection).doc(itemSnapshot.id).set(itemSnapshot);

    this.db.collection(fromCollection).doc(itemSnapshot.id).collection(fromSubCollection).valueChanges()
      .subscribe(sub_collection_items => {
        // Loop through sub collection items
        if (sub_collection_items.length > 0) {
          for (let sub_collection_item of sub_collection_items) {
            // Copy sub collection item to toCollection
            this.db.collection(toCollection)
              .doc(itemSnapshot.id).collection(fromSubCollection).doc(sub_collection_item.id).set(sub_collection_item)
              .then(() => {
                // Delete original sub collection item
                this.db.collection(fromCollection).doc(itemSnapshot.id).collection(fromSubCollection).doc(sub_collection_item.id).delete()
              })

          }
        }
      });
    this.notify.sendNotification(`Moved ${itemSnapshot.id} from ${fromCollection} and ${fromCollection}/${fromSubCollection} to ${toCollection}`)
  }

}
