import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { BlogComponent } from './components/blog/blog.component';
import { NewPostComponent } from './components/blog/new-post/new-post.component';
import { EditPostComponent } from './components/blog/edit-post/edit-post.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StoryPageComponent } from './components/blog/story-page/story-page.component';


export const nav_path = {
  HOME: '/',
  BLOG: '/blog',
  BLOG_POST: '/blog/post',
  BLOG_NEW_POST: '/blog/new-post',
  DASHBOARD: '/dashboard',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_EMAIL: '/auth/verify-email',
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: SignInComponent },
      { path: 'register', component: SignUpComponent },
      // { path: 'logout', component: LogoutComponent },
      // { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
  ] },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/new-post', component: NewPostComponent },
  { path: 'blog/post/:postID', component: StoryPageComponent },
  { path: 'blog/post/:postID/edit', component: EditPostComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
