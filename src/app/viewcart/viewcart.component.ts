import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';
import { CartapiService } from '../cartapi.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnDestroy {
  productForm: any = FormGroup;
  products: any = [];
  productimage: any;
  productData: any;
  updatedProduct: any;
  allProducts: number = 0;
  totalPrice: any = 0;

  constructor(private cartapi: CartapiService, private productService: ApiserviceService) {
    this.getCart();
    this.getProductData()
    console.log(this.updatedProduct)
  }

  ngOnInit() {
    debugger
  }

  getCart() {
    this.productService.getProduct().subscribe((data: any) => {
      this.productData = data;
      const cartId = localStorage.getItem('cartId');
      const dataForProduct = this.productData.find((x: any) => {
        console.log("data" + JSON.stringify(this.productData))
        console.log("id" + cartId)
        return x.id == cartId
      })
      this.updatedProduct = dataForProduct
    })
  }
  getProductData() {
    this.cartapi.getProductData().subscribe(res => {
      debugger
      this.products = res;
      this.calculateTotalPrice();
    });
  }

  // removeProduct(item:any){
  //   this.cartapi.removeCartData(item);
  // }
  // removeCart(id: number) {
  //   this.cartapi.removeCart(id).subscribe({
  //     next: (val: any) => {
  //       alert("Item deleted successfully.");
  //       this.cartapi.getProductData().subscribe(res=>{
  //         this.products=res;
  //         this.allProducts=this.cartapi.getTotalAmount();
  //       })
  //      },
  //     error: console.log
  //   });
  // }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.products.forEach((element: { productprice: number; quantity: number; }) => {
      this.totalPrice += (element.productprice * element.quantity);
    });
  }

  removeCart(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove this Item?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.cartapi.removeCart(id).subscribe({
          next: (val: any) => {
            this.cartapi.getProductData().subscribe(res => {
              this.products = res;
              this.calculateTotalPrice();
              this.allProducts = this.cartapi.getTotalAmount();
            })
          },
          error: console.log
        });
        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your item is safe :)',
          'error'
        )
      }
    })
  }


  removeAllProduct() {
    alert("removeAllProduct call")
    // this.totalPrice=0;
    // this.products=[];
    // this.cartapi.removeAllCart();
    // this.cartapi.removeAllCart(this.products).subscribe((x: any) => {
    this.cartapi.removeAllCart().subscribe((x: any) => {
      // debugger
      console.log(x);

    });
  }

  inc(item: any) {
    debugger
    // console.log(item);
    // item.quantity+= 1;
    // this.cartapi.totalQuantity+1;
    item.quantity++;
    this.totalPrice = item.productprice * item.quantity;
    this.cartapi.updateCart(item.id, item.quantity).subscribe(() => {
      this.calculateTotalPrice();
      console.log("cart updated");
    });
  }
  dec(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.totalPrice = item.productprice * item.quantity;
      this.cartapi.updateCart(item.id, item.quantity).subscribe(() => {
        this.calculateTotalPrice();
        console.log("cart updated");
      });
    }
  }

  ngOnDestroy() {
    localStorage.clear()
  }
}