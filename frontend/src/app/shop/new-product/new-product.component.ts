import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationService } from '../../services/notification.service';
import { Product } from '../../shared/interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'anon-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  newProductForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(null),
  })
  submitted = false;

  constructor(
    private db:AngularFirestore,
    private notify: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.newProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [null, [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.newProductForm?.invalid) {return}
    const newProduct: Product = {
      name: this.newProductForm?.value.name,
      description: this.newProductForm?.value.description,
      price: this.newProductForm?.value.price,
      date_added: Date.now(),
    }
    this.db.collection('products').add(newProduct)
      .then((newProduct) => {
        this.notify.sendNotification('✅ Successfully added your new product to the shop!');
        this.router.navigate(['/dashboard']);
      })
  }

}
