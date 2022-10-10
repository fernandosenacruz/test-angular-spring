import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shered/app-material/app-material.module';
import { SharedModule } from '../shered/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    ProductsRoutingModule,
  ],
  exports: [ProductsComponent],
})
export class ProductsModule {}
