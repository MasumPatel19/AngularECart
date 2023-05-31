import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post("http://localhost:3000/login", data);
  }

  product(data: any): Observable<any> {
    return this.http.post("http://localhost:3000/product", data);
  }
  getProduct(): Observable<any> {
    return this.http.get("http://localhost:3000/product");
  }
  getProductById(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/product/${id}`);
  }

  // addCart(data: any): Observable<any> {
  //   return this.http.post("http://localhost:3000/cart", data);
  // }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/product/${id}`)
  }

  updateProduct(id: number, data: any): Observable<any> {
    // alert(id + JSON.stringify(data));
    return this.http.put(`http://localhost:3000/product/${id}`, data);
  }

  username: any = 'Icecream lover';

}