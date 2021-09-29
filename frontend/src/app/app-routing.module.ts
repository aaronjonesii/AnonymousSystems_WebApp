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

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'shop/cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'shop/cart/checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'shop/cart/checkout/success', component: CheckoutSuccessComponent, canActivate: [AuthGuard] },
  { path: 'shop/new-product', component: NewProductComponent, canActivate: [AuthGuard] },
  { path: 'shop/:productId', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'shop/:productId/edit', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: '**', component: ComingSoonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
