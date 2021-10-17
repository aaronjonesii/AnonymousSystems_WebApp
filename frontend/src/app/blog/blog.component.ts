import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Post } from '../shared/interfaces/post';

@Component({
  selector: 'anon-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  userPosts: Post[] = [];

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    // Get User ID
    this.afAuth.user.subscribe(result => {
      let user_id = result!.uid;
      // Get User posts
      let postsRef = this.db.collection('posts', ref => ref.where('author', '==', user_id));
      postsRef.valueChanges().subscribe((userPosts: any) => {
        this.userPosts = userPosts;
      } )
    })
  }

  ngOnInit(): void {}

}
