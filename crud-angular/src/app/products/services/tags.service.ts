import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { Tag } from '../containers/products/interfaces/tag';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private readonly API = '/assets/tags.json';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Tag[]>(this.API).pipe(first());
  }
}
