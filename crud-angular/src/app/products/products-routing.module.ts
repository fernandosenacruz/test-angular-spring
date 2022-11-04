import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductsComponent } from './containers/products/products.component';
import { ProductResolver } from './guards/product.resolver';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products/register', component: FormProductComponent },
  {
    path: 'products/edit/:id',
    component: FormProductComponent,
    resolve: { product: ProductResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
