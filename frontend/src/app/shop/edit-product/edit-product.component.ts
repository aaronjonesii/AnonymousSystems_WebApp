import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const getObservable = (collection: AngularFirestoreCollection<Product>) => {
  const subject = new BehaviorSubject<Product[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Product[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'anon-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: Product | undefined;
  products = getObservable(this.db.collection('products'));

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private router: Router,
  ) {
    const productIdFromRoute = String(this.route.snapshot.paramMap.get('productId'));
    this.products.subscribe(
      (allProducts: Product[]) => this.product = allProducts.find((product: Product) => product.id === productIdFromRoute)
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    this.product!.last_updated = Date.now();
    this.db.collection('products').doc(this.product!.id).set(this.product)
      .then(() => this.router.navigate(['/shop', this.product?.id]))
  }

}
