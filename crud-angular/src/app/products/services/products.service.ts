import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import products from 'src/app/utils/products';

import { Product } from './../products/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  list(): Product[] {
    return products;
  }
}
