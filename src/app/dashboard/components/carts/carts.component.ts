import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/products/services/products.service';


@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  constructor(private service: DashboardService, private build: FormBuilder, private modalService: NgbModal, private productService: ProductsService) { }
  carts: any[] = [];
  products: any[] = [];
  form!: FormGroup;
  total = 0;
  details: any;
  proid?: number;
  loading: boolean = false;
  ngOnInit() {
    this.form = this.build.group({ start: [''], end: [''] });
    this.getAllCarts();
  }
  getAllCarts() {
    this.loading = true;
    this.service.getAllCarts().subscribe((res: any) => { this.carts = res; this.loading = false; });
    console.log(this.carts);

  }
  applyFilter() {
    let date = this.form.value;
    this.service.getAllCarts(date).subscribe((res: any) => { this.carts = res });
    console.log(this.carts);
  }
  deleteCart(id: number) {
    return this.service.deleteCart(id).subscribe(res => {
      this.carts = this.carts.filter(p => p.id !== id)
      alert("data deleted successfully")
    })
  }
  viewCart(content: any, index: number) {
    this.products = [];
    this.details = this.carts[index];
    console.log(this.details.products);
    for (let i in this.details.products) {
      this.proid = this.details.products[i].productId;
      this.productService.getProductById(this.details.products[i].productId).subscribe(res => {
        this.products.push({ item: res, quantity: this.details.products[i].quantity });
      });
    }
    console.log(this.products);
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        console.log("Modal closed with: ", result);
      },
      (reason) => {
        console.log("Dismissed: ", reason);
      }
    );
  }

}
