import { Component, OnInit } from '@angular/core';
import { CreateInfoHostService } from './create-info-host.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from '../common-service/local-storage.service';
import { GlobalConstants } from '../constant/local-storage-constant';

@Component({
  selector: 'app-create-info-host',
  templateUrl: './create-info-host.component.html',
  styleUrls: ['./create-info-host.component.css']
})
export class CreateInfoHostComponent implements OnInit {
  isHost: boolean;
  previousUrl: string;
  constructor(
    private createInfoHostService: CreateInfoHostService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.previousUrl = this.localStorageService.get(GlobalConstants.PREVIOUS_URL);
    if(this.localStorageService.get(GlobalConstants.SHOP_ID) == null && this.localStorageService.get(GlobalConstants.CART_ID) == null){
      this.router.navigate(['/shop']);
    } else {
      if(this.previousUrl.includes('/shop/')){
        this.isHost = true;
      } else if(this.previousUrl.includes('/cart/')) {
        this.isHost = false;
      }
    }
  }

  numberRegEx = /^0+[0-9]{9}$/;

  loginCustomerForm = new FormGroup({
    phoneNumber: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.numberRegEx), Validators.maxLength(15)]
    }),
  });
  
  login(): void {
    this.createInfoHostService.onLoginCustomer(this.loginCustomerForm.get('phoneNumber').value).subscribe(
      (res) => { 
        this.localStorageService.set(GlobalConstants.CUSTOMER_INFO, res);
        this.localStorageService.set(GlobalConstants.CUSTOMER_ID, res.customerId);
        this.router.navigate([this.previousUrl])
      },
      (err) => {
        alert(err.errors.title);
      }
    );
  }

  createCustomer(obj: any){
    if(obj.isSuccess){
      this.localStorageService.set(GlobalConstants.CUSTOMER_ID, obj.customerId);
      this.router.navigate([this.previousUrl])
    } else {
      alert(obj.errorMessage);
    }
  }
}
