import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateShopService } from './create-shop.service';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css']
})
export class CreateShopComponent implements OnInit {
  
  constructor(
    private createShopService: CreateShopService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  numberRegEx = /^0+[0-9]{9}$/;

  loginShopForm = new FormGroup({
    phoneNumber: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.numberRegEx), Validators.maxLength(15)]
    }),
  });
  
  loginShop(): void {
    this.createShopService.onLoginShop(this.loginShopForm.get('phoneNumber').value).subscribe(
      (res) => { 
        this.router.navigate(['/admin/' + res.shopId])
      },
      (err) => {
        alert(err.error);
      }
    );
  }
}
