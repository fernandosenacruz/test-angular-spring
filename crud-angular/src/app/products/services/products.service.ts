import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { Product } from '../containers/products/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API = '/assets/products.json';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Product[]>(this.API).pipe(first());
  }

  loadById(id: string) {
    return this.httpClient.get<Product>(`${this.API}/${id}`);
  }

  save(record: Partial<Product>) {
    return this.httpClient.post<Product>(this.API, record);
  }
}
