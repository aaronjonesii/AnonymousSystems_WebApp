import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbButtonModule, NbDialogModule, NbMenuModule, NbToastrModule } from "@nebular/theme";
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './theme.module';
import { HttpClientModule } from '@angular/common/http';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
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

const AUTH_COMPONENTS = [
  SignUpComponent,
  SignInComponent,
  ForgotPasswordComponent,
  VerifyEmailComponent,
]

const SHOP_COMPONENTS = [
  ProductListComponent,
  ProductDetailComponent,
  ShoppingCartComponent,
  CheckoutComponent,
  CheckoutSuccessComponent,
  NewProductComponent,
  EditProductComponent,
]

@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
    SnackbarComponent,
    ...AUTH_COMPONENTS,
    DashboardComponent,
    ...SHOP_COMPONENTS,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ThemeModule.forRoot(),
    NbDialogModule,
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatTooltipModule,
    NbButtonModule,

    //  Lazy Loaded Modules below
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DATA, useValue: {} },
    AuthService, DatePipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [SnackbarComponent],
})
export class AppModule { }
