import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'anon-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  shopping_cart_items: Product[] = [];

  constructor(
    public cartService: CartService,
  ) {
    this.cartService.shopping_cart_items$.subscribe(shopping_cart_items => this.shopping_cart_items = shopping_cart_items)
  }

  ngOnInit(): void {}

}
