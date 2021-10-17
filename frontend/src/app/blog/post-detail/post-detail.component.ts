import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../shared/interfaces/post';

@Component({
  selector: 'anon-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post = {};

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
  ) {
    // Get post id from URL
    const postIdFromRoute = String(this.route.snapshot.paramMap.get('postID'));
    // Get blog post
    let postRef = this.db.collection('posts', ref => ref.where('id', '==', postIdFromRoute));
    postRef.valueChanges().subscribe((post: any) => this.post = post[0])
  }

  ngOnInit(): void {}

}
