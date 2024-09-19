import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private service: CartService) { }
  cartProducts: any[] = [];
  total: number = 0;
  success: boolean = false;
  ngOnInit(): void {
    this.getCartProducts();
  }
  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!) || [];
    }
    this.getTotale();
    console.log(this.cartProducts);
  }
  getTotale() {

    this.total = this.cartProducts.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  }
  removeFromCart(item: any) {
    this.cartProducts = this.cartProducts.filter(p => p !== item);
    this.saveCart();
    this.getTotale();
  }
  updateQuantity(item: any, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(item);
    } else {
      item.quantity = quantity;
      this.getTotale();
      this.saveCart();
    }
  }
  checkQuantity(item: any) {
    if (item.quantity <= 0) {
      this.removeFromCart(item);
    } else {
      this.getTotale();
      this.saveCart();
    }
  }
  clearCart() {
    this.cartProducts = [];
    this.saveCart();
    localStorage.removeItem("cart");
  }
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  addCart() {
    let products = this.cartProducts.map(p => {
      return { productId: p.item.id, quantity: p.quantity }
    })
    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    }
    this.service.createNewCart(Model).subscribe(
      res => { this.success = true });
    console.log(Model);
    console.log("hi");
  }
}
