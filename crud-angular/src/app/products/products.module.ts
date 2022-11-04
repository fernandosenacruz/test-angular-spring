import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shered/app-material/app-material.module';
import { SharedModule } from '../shered/shared.module';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsComponent } from './containers/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductsComponent, FormProductComponent, ProductListComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
  ],
  exports: [ProductsComponent],
})
export class ProductsModule {}
