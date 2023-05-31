import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';
import { CartapiService } from '../cartapi.service';
// interface Product {
//   id: Number;
//   productname: String;
//   productprice: Number;
//   productdescription: String;
//   productimage: String;
// }
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  products: any = [];
  productimage: any;
  p: any;
  cnt: number = 0;
  productForm: any = FormGroup;
  searchText: any;
  msg: any;

  constructor(private route: Router, private dialog: MatDialog, private apiservice: ApiserviceService, private formBuilder: FormBuilder, private cartapi: CartapiService) {

  }

  addProduct() {
    this.route.navigateByUrl('addproduct');
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove this Item?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.apiservice.deleteProduct(id).subscribe({
          next: (val: any) => {
            // alert("Item deleted successfully.");
            this.getProduct();
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

  ngOnInit() {
    // this.cnt=this.cartapi.countnumber();
    this.getProduct();
    this.productForm = this.formBuilder.group({
      productname: [''],
      productprice: [''],
      productdescription: [''],
      productimage: [''],
    });
    this.getCartNumber();
  }

  getCartNumber() {
    this.cartapi.getProductData().subscribe(res => {
      debugger
      this.cnt = res.length;
    })
  }

  getProduct() {
    this.apiservice.getProduct().subscribe(
      {
        next: (val: any) => {
          debugger
          this.products = val;
          this.products.forEach((a: any) => {
            Object.assign(a, { quantity: 1, total: a.price })
          });
          console.log(this.products);
          // this.cnt = val.length
        },
        error: console.log
      });
    this.getCartNumber();
  }

  cart() {
    this.route.navigateByUrl('viewcart');
  }
  tinyAlert() {
    Swal.fire({
      title: 'Item is already present in your cart',
      text: 'Continue Shopping :)'
    });
  }
  addToCart(val: any) {

    if (val.id === this.cartapi.chechProduct) {
      this.tinyAlert();
    }
    else {
      debugger
      console.log("dashboard ts : " + JSON.stringify(val))
      this.cartapi.addToCart(val).subscribe((res) => {
        this.getCartNumber();
        // alert("item added")
        Swal.fire({
          text: 'Item is added to your cart'
        });
        console.log('item added', res)
      });
    }
  }
  uname = this.apiservice.username;

}