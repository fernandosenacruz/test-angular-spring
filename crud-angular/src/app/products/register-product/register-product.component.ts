import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductsService } from './../services/products.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],
})
export class RegisterProductComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductsService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      description: [null],
      urlImage: [null],
      unitValue: [null],
    });
  }

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

  onClear() {}
}
