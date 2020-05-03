import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { ProductCrudComponent } from './views/product-crud/product-crud.component'
import { ProductCreateComponent } from './components/product/product-create/product-create.component'
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';

const products_url = 'products'

const routes: Routes = [{
    path: "",
    component: HomeComponent
  },
  {
    path: products_url,
    component: ProductCrudComponent
  },
  {
    path: products_url+"/create",
    component: ProductCreateComponent
  },
  {
    path: products_url+"/update/:id",
    component: ProductUpdateComponent
  },
  {
    path: products_url+"/delete/:id",
    component: ProductDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
