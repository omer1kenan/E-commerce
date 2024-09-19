import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPorductsComponent } from './components/all-porducts/all-porducts.component';
import { ProductsDatailsComponent } from './components/products-datails/products-datails.component';
import { SharedModule } from "../shared/shared.module";
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AllPorductsComponent,
    ProductsDatailsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class ProductsModule { }
