import { Injectable } from '@angular/core';
import { Product } from '../shared/interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _shopping_cart_items$ = new BehaviorSubject<any>([]);
  public shopping_cart_items$ = this._shopping_cart_items$.asObservable();
  items: Product[] = [];

  constructor() { }

  addToCart(product: Product) {
    let current_shoppping_cart_items: Product[] = this._shopping_cart_items$.value;
    current_shoppping_cart_items.push(product);
    this._shopping_cart_items$.next(current_shoppping_cart_items);
  }

  clearCart() {
    this._shopping_cart_items$.next([]);
  }

  removeFromCart(cart_item: Product) {
    let current_shopping_cart_items: Product[] = this._shopping_cart_items$.value;
    current_shopping_cart_items = current_shopping_cart_items.filter(product => product !== cart_item)
    this._shopping_cart_items$.next(current_shopping_cart_items);
  }
}
