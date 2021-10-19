import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ExtrasService } from './services/extras.service';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/headers/main-header/main-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { UserHeaderComponent } from './components/headers/main-header/user-header/user-header.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { MatMenuModule } from '@angular/material/menu';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule, APP_NAME, APP_VERSION } from '@angular/fire/compat/analytics';
import { AngularFireAuthModule, USE_DEVICE_LANGUAGE, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { CookiesPopupComponent } from './components/cookies-popup/cookies-popup.component';
import { LocalStorageService } from './services/local-storage.service';
import { LocalStorageRefService } from './services/local-storage-ref.service';
import { AuthComponent } from './components/auth/auth.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './components/blog/blog.component';
import { NewPostComponent } from './components/blog/new-post/new-post.component';
import { EditPostComponent } from './components/blog/edit-post/edit-post.component';
import { EditorComponent } from './components/blog/editor/editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FooterComponent } from './components/footer/footer.component';
import { environment } from '../environments/environment';
import { StoryHeaderComponent } from './components/headers/story-header/story-header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SlugifyPipe } from './utils/pipes/slugify.pipe';
import { UrlService } from './services/url.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StoryPageComponent } from './components/blog/story-page/story-page.component';
import { StorySocialsComponent } from './components/blog/story-page/story-socials/story-socials.component';
import { AuthorFollowButtonComponent } from './components/blog/story-page/author-follow-button/author-follow-button.component';

const ANGULAR_MATERIAL_MODULES = [
  MatIconModule, MatSnackBarModule, MatMenuModule,
];

const COMPONENTS = [
  HomeComponent,
  MainHeaderComponent,
  FooterComponent,
  UserHeaderComponent,
  CookiesPopupComponent,
  LoadingComponent,
  PageNotFoundComponent,
];

const AUTH_COMPONENTS = [
  AuthComponent, SignInComponent, SignUpComponent, ForgotPasswordComponent,
  VerifyEmailComponent,
];

const BLOG_COMPONENTS = [
  BlogComponent,
  NewPostComponent,
  EditPostComponent,
  EditorComponent,
  StoryHeaderComponent,
  StoryPageComponent,
  StorySocialsComponent,
  AuthorFollowButtonComponent,
];

const PIPES = [
  SlugifyPipe
];

const PROVIDERS = [
  ExtrasService,
  NotificationService,
  AuthService,
  LocalStorageService,
  LocalStorageRefService,
  UrlService,

  {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 0}},
  { provide: FIRESTORE_SETTINGS, useValue: { ignoreUndefinedProperties: true } },
  { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined },
  { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
  { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined },
  { provide: USE_DEVICE_LANGUAGE, useValue: true },
  { provide: APP_VERSION, useValue: '0.1.6' },
  { provide: APP_NAME, useValue: 'Anonymous Systems' },
];

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...AUTH_COMPONENTS,
    ...BLOG_COMPONENTS,
    ...PIPES,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...ANGULAR_MATERIAL_MODULES,
    FormsModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,

    CKEditorModule,
  ],
  exports: [],
  providers: [...PROVIDERS, ...PIPES],
  bootstrap: [AppComponent]
})
export class AppModule { }
