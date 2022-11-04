import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../containers/products/interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  constructor() {}

  ngOnInit(): void {}

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(product: Product) {
    this.delete.emit(product);
  }
}
