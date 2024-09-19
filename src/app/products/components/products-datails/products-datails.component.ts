import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-datails',
  templateUrl: './products-datails.component.html',
  styleUrls: ['./products-datails.component.scss']
})
export class ProductsDatailsComponent implements OnInit {
  id: any;
  data: any = {};
  loading: boolean = false;
  constructor(private route: ActivatedRoute, private productsService: ProductsService) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id); // Output: your-route-parameter-value
  }

  ngOnInit(): void { this.getProduct(); }
  getProduct() {
    this.loading = true;
    this.productsService.getProductById(this.id).subscribe({
      next: (res: any) => {
        this.data = res;
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
}
