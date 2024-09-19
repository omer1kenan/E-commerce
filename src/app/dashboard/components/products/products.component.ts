import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/products/services/products.service';
import { DashboardService } from '../services/dashboard.service';
import { Product } from 'src/app/products/components/product/models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  newProduct: any = {
    title: '',
    price: '',
    description: '',
    image: '',
    catagory: '',
  };
  loading: boolean = false;
  categories: any[] = [];
  base64: any = "";
  form!: FormGroup
  isEditMode: boolean = false;
  isViewMode: boolean = false;
  haveImage: boolean = false;

  constructor(private productService: ProductsService, private modalService: NgbModal, private build: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.form = this.build.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.getProducts();
    this.getCategory();
  }

  getProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.loading = false;
    });
  }

  addProduct(content: any) {
    this.isEditMode = false;
    this.newProduct;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        console.log("Modal closed with: ", result);
      },
      (reason) => {
        console.log("Dismissed: ", reason);
      }
    );

  }

  filterCatagory(event: any) {
    this.form.get('category')?.setValue(event.target.value);
    console.log(this.form);
  }

  getCategory() {
    this.loading = true;
    this.productService.getCategories().subscribe((res: any) => {
      this.categories = res;
      this.loading = false;
    });
  }

  saveProduct() {
    const modal = this.form.value;
    this.dashboardService.createProduct(modal).subscribe((res: any) => {
      alert('Product saved');
    });
    console.log("New product added: ", this.form);
  }

  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue(this.base64);
      console.log(this.base64);
    }
    if (this.base64) {
      this.haveImage = true;
    }
  }

  editProduct(item: Product, content: any) {
    this.isEditMode = true;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        console.log("Modal closed with: ", result);
      },
      (reason) => {
        console.log("Dismissed: ", reason);
      }
    );
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
    })
    this.base64 = item.image;
    if (this.base64) {
      this.haveImage = true;
    }
  }

  viewProductDetails(item: Product, content: any) {
    this.isViewMode = true;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        console.log("Modal closed with: ", result);
      },
      (reason) => {
        console.log("Dismissed: ", reason);
      }
    );
    this.form.get('image')?.setValue(item.image);
    this.form.get('title')?.setValue(item.title);
    this.form.get('price')?.setValue(item.price);
    this.form.get('description')?.setValue(item.description);
    this.form.get('category')?.setValue(item.category);
    this.base64 = item.image;
    if (this.base64) {
      this.haveImage = true;
    }
  }

  deleteProduct(id: number) {
    this.dashboardService.deleteProduct(id).subscribe(res => {
      this.products = this.products.filter(item => item.id !== id)
      alert('Product deleted');
    });
  }
}
