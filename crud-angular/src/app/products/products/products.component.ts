import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

import { Product } from './interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private ProductsService: ProductsService) {
    this.products = this.ProductsService.list();
   }

  ngOnInit(): void {
  }

}
