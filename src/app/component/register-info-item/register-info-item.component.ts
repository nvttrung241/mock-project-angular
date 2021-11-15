import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item.model';
import { RegisterInfoItemService } from './register-info-item.service';
import { ShopService } from 'src/app/view-menu-order-shop/view-menu-order-shop.service';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-register-info-item',
  templateUrl: './register-info-item.component.html',
  styleUrls: ['./register-info-item.component.css']
})
export class RegisterInfoItemComponent implements OnInit, OnChanges {
  // true: register Item, false: edit Item
  @Input() isRegisterItem: boolean = true;
  @Input() shopId: string;
  @Input() itemEdit: Item;
  @Output() reloadShopInfoEvent = new EventEmitter<boolean>();
  @ViewChild('inputImage') inputImage: ElementRef;

  imageFile: string;
  editImageFlag: boolean = false;
  constructor(
    private registerInfoItemService: RegisterInfoItemService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.reset();
    this.editImageFlag = false;
    if(this.isRegisterItem){
      this.itemEdit = null;
    }else {
      this.imageFile = this.commonService.converStringToBase64(this.itemEdit?.image);
      this.registerItemForm.patchValue({
        name: this.itemEdit?.name,
        price: this.itemEdit?.price,
        imgSrc: this.itemEdit?.image,
      });
    }
  }
  // ------------------------------------------------

  registerItemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required,  Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    imgSrc: new FormControl(''),
  });

  onImageChange(e) {
    let reader = new FileReader();
    this.registerItemForm.patchValue({
      imgSrc: e.target.files[0]
    });
    if(e.target.files && e.target.files.length) {
      let [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.editImageFlag = true;
        this.imageFile = reader.result as string;
      };
    }
  }

  modifyItem(){
    let formData = new FormData();
    formData.append('shopId', this.shopId);
    if(this.isRegisterItem){
      formData.append('name', this.registerItemForm.get('name').value);
      formData.append('price', this.registerItemForm.get('price').value);
      formData.append('image', this.registerItemForm.get('imgSrc').value);
      this.registerInfoItemService.onRegisterItem(formData).subscribe(
        (res) => {
          // get info shop after register Item
          this.reloadShopInfoEvent.emit(true);
          this.reset();
          alert('create item success');
        },
        (err) => {
          alert(err.error.text);
        }
      );
    } else {
      formData.append('itemId', this.itemEdit?.itemId);
      formData.append('name', this.registerItemForm.get('name').value);
      formData.append('price', this.registerItemForm.get('price').value);
      formData.append('image', this.registerItemForm.get('imgSrc').value);
      this.registerInfoItemService.onModifyItem(formData).subscribe(
        (res) => {
          // get info shop after register Item
          this.reloadShopInfoEvent.emit(true);
          alert('update item success');
        },
        (err) => {
          alert(err.error.text);
        }
      );
    }
  }

  compareChangeInfoItem(): boolean{
    if(this.itemEdit?.name !== this.registerItemForm.get('name').value
      || this.itemEdit?.price !== this.registerItemForm.get('price').value
      || this.editImageFlag){
      return false;
    }
    return true;
  }

  reset(){
    if(this.inputImage != undefined){
      this.inputImage.nativeElement.value = "";
    }
    this.imageFile = '';
    this.registerItemForm.reset();
  }
}
