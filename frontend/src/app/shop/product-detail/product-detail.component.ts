import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../cart.service';
import { NotificationService } from '../../services/notification.service';

const getObservable = (collection: AngularFirestoreCollection<Product>) => {
  const subject = new BehaviorSubject<Product[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Product[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'anon-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  products = getObservable(this.db.collection('products'));

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private cartService: CartService,
    private notify: NotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const productIdFromRoute = String(this.route.snapshot.paramMap.get('productId'));
    this.products.subscribe(
      (allProducts: Product[]) => this.product = allProducts.find((product: Product) => product.id === productIdFromRoute)
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigate(['/shop', 'cart']);
  }

  deleteProduct(product: Product) {
    this.db.collection('products').doc(this.product!.id).delete().then(() => {
      this.notify.sendNotification(`Removed the product "${this.product?.name}"`);
      this.router.navigate(['/dashboard']);
    });
  }

}
