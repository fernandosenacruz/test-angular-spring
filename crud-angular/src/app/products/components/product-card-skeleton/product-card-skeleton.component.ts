import { Component } from '@angular/core';
import { Product } from '../../containers/products/interfaces/product';

@Component({
  selector: 'app-product-card-skeleton',
  templateUrl: './product-card-skeleton.component.html',
  styleUrl: './product-card-skeleton.component.scss'
})
export class ProductCardSkeletonComponent {
  product: Product = {
    _id: '',
    name: '',
    description: '',
    unitValue: 0,
    urlImage: '',
    tags: []
  }

  products: Product[] = new Array(5).fill(this.product);
}
