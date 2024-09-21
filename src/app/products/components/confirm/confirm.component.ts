import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  orderId: string | null = null;
  orderSuccess: boolean = false;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.orderId = localStorage.getItem('orderId') || '123456';
    this.orderSuccess = true;
    localStorage.removeItem("cart");
  }
  continueShopping() {
    this.router.navigate(['products']);
  }
  retryOrder() {
    console.log('Retrying the order...');
    this.router.navigate(['/cart']);
  }
}
