import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationService } from '../../services/notification.service';
import { Product } from '../../shared/interfaces/product';
import { Router } from '@angular/router';
import { dynamicFormFields, FormField } from '../../shared/interfaces/form-field';

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

  test= [{ id: 1, field_name: 'Default Dynamic Field Name', field_value: 'Default Dynamic Field Value' }]

  constructor(
    private db:AngularFirestore,
    private notify: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.newProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [null, [Validators.required]],
    });
    this.test.pop();
  }

  addDynamicField(fieldName: string) {
    this.test.push({ id: this.test.length + 1, field_name: fieldName, field_value: '' })
  }
  removeDynamicField(i: number) { this.test.splice(i, 1); }
  logValue() { this.notify.sendNotification(JSON.stringify(this.test)) }

  private getValidator(formField: FormField|any): ValidatorFn | null {
    switch(formField.validator) {
      case "email":
        return Validators.email;
      case "required":
        return Validators.required;
      default:
        return null;
    }
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
