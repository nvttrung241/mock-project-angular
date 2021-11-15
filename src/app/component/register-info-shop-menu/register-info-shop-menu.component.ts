import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterInfoShopMenuService } from './register-info-shop-menu.service';
import { ShopInfo } from 'src/app/model/shopInfo.model';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-register-info-shop-menu',
  templateUrl: './register-info-shop-menu.component.html',
  styleUrls: ['./register-info-shop-menu.component.css']
})
export class RegisterInfoShopMenuComponent implements OnInit, OnChanges {
  // true: register shop, false: edit shop
  @Input() isRegisterShop: boolean = true;
  // obj display info shop to edit
  @Input() shopInfo: ShopInfo;

  imageFile: string;
  numberRegEx = /^0+[0-9]{9}$/;
  isChangeLogo: boolean = false;
  constructor(
    private router: Router,
    private commonService: CommonService,
    private registerInfoShopMenuService: RegisterInfoShopMenuService,
  ) { }

  ngOnInit(): void {
    this.isChangeLogo = false;
  }

  ngOnChanges() {
    this.registerShopForm?.reset();
    this.isChangeLogo = false;
    if(this.isRegisterShop){
      this.shopInfo = null;
    }else {
      this.imageFile = this.commonService.converStringToBase64(this.shopInfo?.image);
      this.registerShopForm.patchValue({
        name: this.shopInfo?.name,
        price: this.shopInfo?.phoneNumber,
        imgSrc: this.shopInfo?.image,
      });
    }
  }
  // ------------------------------------------------
  registerShopForm = new FormGroup({
    shopName: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.numberRegEx), Validators.maxLength(15)]),
    imgSrc: new FormControl(''),
  });
  
  onImageChange(e) {
    let reader = new FileReader();
    this.isChangeLogo = true;
    this.registerShopForm.patchValue({
      imgSrc: e.target.files[0]
    });
    this.imageFile = e.target.files;
    if(e.target.files && e.target.files.length) {
      let [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imageFile = reader.result as string;
      };
    }
  }

  register(){
    let formData = new FormData();
    formData.append('Name', this.registerShopForm.get('shopName').value);
    formData.append('PhoneNumber', this.registerShopForm.get('phoneNumber').value);
    formData.append('Logo', this.registerShopForm.get('imgSrc').value);
    this.registerInfoShopMenuService.onRegister(formData).subscribe(
      (res) => {
        this.router.navigate(['/admin/' + res.shopId]);
      },
      (err) => {
        alert(err.error);
      }
    );
  }

  modifyShop(){
    let formData = new FormData();
    formData.append('Name', this.registerShopForm.get('shopName').value);
    formData.append('PhoneNumber', this.registerShopForm.get('phoneNumber').value);
    if(this.shopInfo?.phoneNumber != this.registerShopForm.get('phoneNumber').value){
      formData.append('Name', this.registerShopForm.get('shopName').value);
    }
    if(this.isChangeLogo){
      formData.append('Logo', this.registerShopForm.get('imgSrc').value);
    }
    this.registerInfoShopMenuService.modifyShop(formData).subscribe(
      (res) => {
        alert('Update Shop successfull!!!');
    },
      (err) => {
        alert(err.error);
      }
    );
  }
}
