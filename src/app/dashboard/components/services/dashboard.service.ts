import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  getAllCarts(param?: any) {
    let params = new HttpParams();
    params = params.append("startDate", param?.start).append("endDate", param?.end);
    return this.http.get(environment.urlBase + 'carts', { params });
  }
  deleteCart(id: number) {
    return this.http.delete(environment.urlBase + 'carts/' + id);
  }
  createProduct(modal: any) {
    return this.http.post(environment.urlBase + 'products', modal);
  }
  deleteProduct(id: number) {
    return this.http.delete(environment.urlBase + 'products/' + id);
  }
}
