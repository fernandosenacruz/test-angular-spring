import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ProductsRoutingModule,
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
