import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shered/app-material/app-material.module';
import { SharedModule } from '../shered/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './containers/products/products.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [ProductsComponent, RegisterProductComponent, ProductListComponent],
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
