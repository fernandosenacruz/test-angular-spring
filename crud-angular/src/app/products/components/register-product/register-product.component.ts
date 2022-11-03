import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],
})
export class RegisterProductComponent implements OnInit {
  form = this.formBuilder.group({
    // não nulo direto no campo
    // name: new FormControl('', { nonNullable: true }),
    name: [''],
    description: [''],
    urlImage: [''],
    unitValue: [0],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ProductsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

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
