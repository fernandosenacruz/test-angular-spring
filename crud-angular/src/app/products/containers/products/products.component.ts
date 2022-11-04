import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shered/components/error-dialog/error-dialog.component';

import { ProductsService } from '../../services/products.service';
import { Product } from './interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private ProductsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.products$ = this.ProductsService.list().pipe(
      catchError((error) => {
        console.log(error);
        this.openDialogError(error.statusText);
        return of([]);
      })
    );
  }

  openDialogError(error: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: error,
    });
  }

  ngOnInit(): void {}

  onEdit(product: Product) {
    this.router.navigate(['edit', product._id], { relativeTo: this.route });
  }

  onDelete(product: Product) {}
}
