import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: any = FormGroup;
  submitted = false;
  imageUrl: any
  fileBase64: any
  constructor(private formBuilder: FormBuilder, private apiservice: ApiserviceService, private route: Router) { }
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      productname: ['', [Validators.required]],
      productprice: ['', [Validators.required]],
      productdescription: [''],
      productimage: ['', [Validators.required]],
    });
  }

  product() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    // debugger

    const data = {
      productdescription: this.productForm.controls['productdescription'].value,
      productimage: this.fileBase64,
      productname: this.productForm.controls['productname'].value,
      productprice: this.productForm.controls['productprice'].value
    }

    this.apiservice.product(data).subscribe({
      next: (val: any) => {
        if (val) {
          alert("Product added successfully");
          // this.productForm.reset();
          this.route.navigateByUrl('dashboard');
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  onImagePicked(event: any) {
    // debugger
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.fileBase64 = this.imageUrl.split(',')[1];
      };
    }
  }

  cancel() {
    this.route.navigateByUrl('dashboard');
  }

}