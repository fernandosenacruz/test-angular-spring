import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shered/components/error-dialog/error-dialog.component';

import { ProductsService } from '../../services/products.service';
import { ConfirmationDialogComponent } from './../../../shered/components/confirmation-dialog/confirmation-dialog.component';
import { Product } from './interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]> | null = null;

  constructor(
    private ProductsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.refresh();
  }

  refresh() {
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

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onDelete(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `
      Deseja remover este produto?
      Esta ação não poderá ser desfeita.
      `,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.ProductsService.remove(product._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Produto removido!', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro! Entre em contato com o suporte.')
        );
      }
    });
  }
}
