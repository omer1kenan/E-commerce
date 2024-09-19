import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPorductsComponent } from './products/components/all-porducts/all-porducts.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { ProductsDatailsComponent } from './products/components/products-datails/products-datails.component';
import { CartsComponent } from './dashboard/components/carts/carts.component';
import { ProductsComponent } from './dashboard/components/products/products.component';
import { LoginComponent } from './dashboard/components/login/login.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivateChild: [authGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'carts', component: CartsComponent }
    ]
  },
  { path: 'products', component: AllPorductsComponent },
  { path: 'datails/:id', component: ProductsDatailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'dashboard/login', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
