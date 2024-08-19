import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(255)]],
    urlImage: ['', [Validators.required]],
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

  getErrorMassage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 3;
      return `O campo deve ter no minimo ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `O campo deve ter no maximo ${requiredLength} caracteres`;
    }

    if (field?.hasError('unitValue')) {
      return 'O valor unitário deve ser maior que zero';
    }

    return 'Campo inválido';
  }

  private onError(err: any) {
    this._snackBar.open(`${err.message}`, '', {
      duration: 5000,
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (data: Product) => console.log(data),
      error: (err: any) => this.onError(err),
    });
  }

  onClear() {
    this.form.reset();
  }
}
