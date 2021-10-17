import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'post/edit/:postID', component: EditPostComponent },
  { path: 'post/:postID', component: PostDetailComponent },
  { path: '**', component: BlogComponent },
];

export const BLOG_COMPONENTS = [
  BlogComponent, AddPostComponent, EditPostComponent, PostDetailComponent,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BlogModule { }
