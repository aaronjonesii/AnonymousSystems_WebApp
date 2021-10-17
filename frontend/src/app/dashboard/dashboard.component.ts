import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../shop/cart.service';

@Component({
  selector: 'anon-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // encapsulation: ViewEncapsulation.None, // Uncomment to change color of background
})
export class DashboardComponent {

  constructor(
    public authService: AuthService,
    public cartService: CartService,
  ) { }



}
