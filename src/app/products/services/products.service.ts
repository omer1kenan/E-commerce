import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getAllProducts() {
    return this.http.get(environment.urlBase + 'products')
  }
  getCategories() { return this.http.get(environment.urlBase + 'products/categories') }
  getProductByCategoryId(categoryName: string) {
    return this.http.get(environment.urlBase + 'products/category/' + categoryName)
  }
  getProductById(productId: any) { return this.http.get(environment.urlBase + 'products/' + productId) }
}
