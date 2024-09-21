import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../product/models/product';
@Component({
  selector: 'app-all-porducts',
  templateUrl: './all-porducts.component.html',
  styleUrls: ['./all-porducts.component.scss']
})
export class AllPorductsComponent implements OnInit {

  products: Product[] = [];
  categories: any[] = [];
  loading: boolean = false;
  cartProduct: any[] = [];
  constructor(private service: ProductsService) { }
  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
  }


  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (error: any) => {
        console.error('Error occurred while fetching products:', error.message);
      },
      complete: () => {
        this.loading = false
        console.log('Product data fetching complete');
      }
    });
  }

  getCategory() {
    this.loading = true;
    this.service.getCategories().subscribe({
      next: (c: any) => {
        this.categories = c;
      },
      error: (e: any) => {
        console.error('Error occurred while fetching categories:', e.message);
      },
      complete: () => {
        this.loading = false
        console.log('Category data fetching complete');
      }
    });
  }
  filterCatagory(event: any) {
    this.loading = true;
    let value = event.target.value;
    console.log(value);
    (value == "All") ? this.getProducts() :
      this.service.getProductByCategoryId(value).subscribe({
        next: (res: any) => {
          this.products = res;
        },
        error: (error: any) => {
          console.error('Error occurred while fetching products:', error.message);
        },
        complete: () => {
          this.loading = false
          console.log('Product data fetching complete');
        }
      })
  }
  addToCart(event: any) {
    if (!event.quantity || event.quantity <= 0) {
      alert("Please select a valid quantity greater than 0");
      return;
    }
    if ("cart" in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!) || [];
      let exist = this.cartProduct.find(v => v.item.id == event.item.id);
      if (exist) {
        alert("this product already in your cart")
      } else {


        if (Array.isArray(this.cartProduct)) {
          this.cartProduct.push(event);
          localStorage.setItem("cart", JSON.stringify(this.cartProduct));
        } else {
          this.cartProduct = [event];
          localStorage.setItem("cart", JSON.stringify(this.cartProduct));
        }
      }
    }
    else {
      this.cartProduct = [event];
      localStorage.setItem("cart", JSON.stringify(this.cartProduct));
    }
  }

}