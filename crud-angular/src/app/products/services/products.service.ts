import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { Product } from './../products/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API = '/assets/products.json';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Product[]>(this.API).pipe(first());
  }
}
