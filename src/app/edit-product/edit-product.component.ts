import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { CartapiService } from '../cartapi.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  editProductForm!:  FormGroup;
  submitted = false;
  imageUrl: any
  fileBase64: any
  productId:any;
  imageData : any
  product:any={};
  constructor(private formBuilder: FormBuilder, private cartservice: CartapiService, private route: Router,private activeroute : ActivatedRoute,private apiservice :ApiserviceService) { }
  ngOnInit() {
    console.log(this.activeroute.snapshot.params['id']);
    // this.productId=this.activeroute.snapshot.params['id'];
    // alert(this.productId);
    // this.apiservice.getProductById(this.productId.subscribe((data: any)=>{
    //   this.product=data;
    // }))
    this.editProductForm = this.formBuilder.group({
      productname: ['', [Validators.required]],
      productprice: ['',[Validators.required]],
      productdescription: [''],
      productimage: [''],
    }) 
    this.apiservice.getProductById(this.activeroute.snapshot.params['id']).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('cartId',res.id)
      debugger
      this.imageData = res['productimage']
      this.editProductForm.patchValue({productname : res['productname'] ,productprice : res['productprice'] , productdescription : res['productdescription']})
    });

  }
  onSubmit() {
    debugger
     this.submitted = true;
    if (this.editProductForm.invalid) {
      return;
    }
    const data = {
      productdescription :  this.editProductForm.controls['productdescription'].value,
      productimage : this.fileBase64 || this.imageData,
      productname :  this.editProductForm.controls['productname'].value,
      productprice :  this.editProductForm.controls['productprice'].value
    }
    this.apiservice.updateProduct(this.activeroute.snapshot.params['id'],data).subscribe((res)=>{
      console.log(res);
    });
    this.route.navigateByUrl('dashboard');
  }

  onImagePicked(event: any) {
    // debugger
    const reader = new FileReader(); 
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
