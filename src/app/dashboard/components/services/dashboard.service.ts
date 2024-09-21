import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  getAllCarts(param?: any) {
    if (param == null || param == undefined) {
      return this.http.get(environment.urlBase + 'carts');
    }
    let params = new HttpParams();
    params = params.append("startdate", param?.start).append("enddate", param?.end);
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
