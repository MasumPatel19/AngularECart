import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {

  cartDataList: any[] = [];
  // totalPrice:number=0;
  // totalQuantity:number=0;
  productList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }
  // count: number = 0;
  items: any[] = [];
  chechProduct: any[] = [];


  getProductData(): Observable<any> {
    this.productList.asObservable();
    return this.http.get("http://localhost:3000/cart");
  }

  getProductById(id: any) {
    return this.http.get(`http://localhost:3000/cart/${id}`);
  }
  updateCartData(id: number, data: any): Observable<any> {
    // alert(id + JSON.stringify(data));
    return this.http.put(`http://localhost:3000/cart/${id}`, data);
  }
  setProduct(product: any) {
    this.cartDataList.push(...product);
    this.productList.next(product);
  }

  addToCart(data: any) {
    this.chechProduct = data.id;
    return this.http.post("http://localhost:3000/cart", data);
  }

  updateCart(itemId: number, quantity: number): Observable<any> {
    return this.http.patch(`http://localhost:3000/cart/${itemId}`, { quantity });
  }

  // countnumber() {
  //   return this.count;
  // }

  getTotalAmount(): number {
    let grandTotal = 0;
    this.cartDataList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal
  }

  removeCart(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/cart/${id}`)
  }

  removeAllCart() {
    // this.cartDataList = []
    // this.productList.next(this.cartDataList)
    // alert("deleted")
    // debugger
    return this.http.delete("http://localhost:3000/cart");
  }

  // removeAllCart(data: any) {
  //   // this.cartDataList = []
  //   // this.productList.next(this.cartDataList)
  //   // alert("deleted")
  //   // debugger
  //   return this.http.delete("http://localhost:3000/cart", data);
  // }

}
