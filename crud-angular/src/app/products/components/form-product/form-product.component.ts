import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../services/products.service';
import { Product } from './../../containers/products/interfaces/product';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  form = this.formBuilder.group({
    // não nulo direto no campo
    // name: new FormControl('', { nonNullable: true }),
    _id: [''],
    name: [''],
    description: [''],
    urlImage: [''],
    unitValue: [0],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ProductsService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const product: Product = this.route.snapshot.data['product'];

    this.form.setValue({
      _id: product._id,
      name: product.name,
      description: product.description,
      urlImage: product.urlImage,
      unitValue: product.unitValue,
    });
  }

  private onError(err: any) {
    this._snackBar.open(`${err.message}`, '', {
      duration: 5000,
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (data) => console.log(data),
      error: (err) => this.onError(err),
    });
  }

  onClear() {
    this.form.reset();
  }
}
