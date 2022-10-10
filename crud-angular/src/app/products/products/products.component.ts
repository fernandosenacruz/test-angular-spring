import { Component, OnInit } from '@angular/core';
import products from 'src/app/utils/products';

import { Product } from './interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = products;

  constructor() { }

  ngOnInit(): void {
  }

}
