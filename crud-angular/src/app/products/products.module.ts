import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shered/app-material/app-material.module';
import { SharedModule } from '../shered/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { RegisterProductComponent } from './register-product/register-product.component';

@NgModule({
  declarations: [ProductsComponent, RegisterProductComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    ProductsRoutingModule,
  ],
  exports: [ProductsComponent],
})
export class ProductsModule {}
