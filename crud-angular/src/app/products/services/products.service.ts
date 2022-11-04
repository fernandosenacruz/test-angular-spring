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

  private create(record: Partial<Product>) {
    return this.httpClient.post<Product>(this.API, record).pipe(first());
  }

  private update(record: Partial<Product>) {
    return this.httpClient
      .put<Product>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  list() {
    return this.httpClient.get<Product[]>(this.API).pipe(first());
  }

  loadById(id: string) {
    return this.httpClient.get<Product>(`${this.API}/${id}`);
  }

  save(record: Partial<Product>) {
    if (record._id) return this.update(record);

    return this.create(record);
  }
}
