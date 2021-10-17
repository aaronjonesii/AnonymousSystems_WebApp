import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'anon-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories = [
    {name: 'Political'},
    {name: 'Entertainment'},
    {name: 'CyberSecurity'},
    {name: 'Technology'},
  ];
  posts = [
    { title: '', img: '', content: '', id: '' },
    { title: '', img: '', content: '', id: '' },
    { title: '', img: '', content: '', id: '' },
    { title: '', img: '', content: '', id: '' },
    { title: '', img: '', content: '', id: '' },
  ];

  constructor(public notify: NotificationService, private db: AngularFirestore,) {
    let postsRef = this.db.collection('posts')
      .valueChanges().subscribe((posts: any) => { this.posts = posts; });
  }

  ngOnInit(): void {}

}
