import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/interfaces/product';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

const getObservable = (collection: AngularFirestoreCollection<Product>) => {
  const subject = new BehaviorSubject<Product[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Product[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'anon-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products = getObservable(this.db.collection('products'));

  constructor(
    private db: AngularFirestore,
    private cartService: CartService,
    private router: Router,
    private notify: NotificationService,
  ) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigate(['/shop', 'cart']);
  }

}
