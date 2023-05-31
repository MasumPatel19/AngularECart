import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: any = FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private apiservice: ApiserviceService, private route: Router) {
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.submitted) {
      // alert("Thanks for filling the form :)");
      // Swal.fire({
      //   text: 'Thanks for filling form'
      // });
    }
  }

  test(event: any) {
    // debugger
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      uname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}$/)
        ]
      ]
    });
  }
  login() {
    if (this.loginForm.invalid) {
      return
    }
    this.apiservice.login(this.loginForm.value).subscribe({
      next: (val: any) => {
        if (val) {
          this.apiservice.username = val.uname;
          // alert("login successfull.");
          this.route.navigateByUrl('dashboard');
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}