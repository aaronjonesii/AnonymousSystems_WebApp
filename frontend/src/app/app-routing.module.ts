import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { SignInComponent } from './shared/auth/sign-in/sign-in.component';
import { SignUpComponent } from './shared/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './shared/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shop/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { CheckoutSuccessComponent } from './shop/checkout-success/checkout-success.component';
import { NewProductComponent } from './shop/new-product/new-product.component';
import { EditProductComponent } from './shop/edit-product/edit-product.component';
import { ShopComponent } from './shop/shop.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VerifyEmailComponent } from './shared/auth/verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: SignInComponent },
      { path: 'register', component: SignUpComponent },
      // { path: 'logout', component: LogoutComponent },
      // { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ] },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'shop', canActivate: [AuthGuard], children: [
    { path: '', component: ShopComponent },
    { path: 'cart', component: ShoppingCartComponent },
    { path: 'cart/checkout', component: CheckoutComponent },
    { path: 'cart/checkout/success', component: CheckoutSuccessComponent },
    { path: 'new-product', component: NewProductComponent },
    { path: ':productId', component: ProductDetailComponent },
    { path: ':productId/edit', component: EditProductComponent },
    ] },
  { path: '**', component: ComingSoonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
