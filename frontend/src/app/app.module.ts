import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './theme.module';
import { HttpClientModule } from '@angular/common/http';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './services/auth.service';
import { ForgotPasswordComponent } from './shared/auth/forgot-password/forgot-password.component';
import { SignInComponent } from './shared/auth/sign-in/sign-in.component';
import { SignUpComponent } from './shared/auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './shared/auth/verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './shop/product-list/product-list.component';
import { DatePipe } from '@angular/common';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shop/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { CheckoutSuccessComponent } from './shop/checkout-success/checkout-success.component';
import { NewProductComponent } from './shop/new-product/new-product.component';
import { EditProductComponent } from './shop/edit-product/edit-product.component';
import { ShopComponent } from './shop/shop.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CookiesPopupComponent } from './cookies-popup/cookies-popup.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { HomeComponent } from './home/home.component';
import { CardComponent, CardContentComponent, CardFooterComponent, CardHeaderComponent } from './card/card.component';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { Firestore } from '@angular/fire/firestore';
import { BlogModule, BLOG_COMPONENTS } from './blog/blog.module';
import { GoBackComponent } from './go-back/go-back.component';

const AUTH_COMPONENTS = [
  SignUpComponent,
  SignInComponent,
  ForgotPasswordComponent,
  VerifyEmailComponent,
]

const LAYOUT_COMPONENTS = [
  LayoutHeaderComponent,
  CookiesPopupComponent,
  UserHeaderComponent,
];

const SHOP_COMPONENTS = [
  ProductListComponent,
  ProductDetailComponent,
  ShoppingCartComponent,
  CheckoutComponent,
  CheckoutSuccessComponent,
  NewProductComponent,
  EditProductComponent,
  ShopComponent,
  HomeComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
    ...AUTH_COMPONENTS,
    DashboardComponent,
    ...SHOP_COMPONENTS,
    ...LAYOUT_COMPONENTS,
    LandingPageComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent,
    GoBackComponent,
    BLOG_COMPONENTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ThemeModule.forRoot(),
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,

    // MatMenuModule,

    //  Lazy Loaded Modules below
    BlogModule,
  ],
  providers: [
    AuthService, DatePipe,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 7500}},
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
  exports: [
    LayoutHeaderComponent
  ]
})
export class AppModule { }
