import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { TableHeader } from 'src/app/model/tableHeader.model';
import { Item } from 'src/app/model/item.model';
import { ShopInfo } from 'src/app/model/shopInfo.model';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-view-menu-shop',
  templateUrl: './view-menu-shop.component.html',
  styleUrls: ['./view-menu-shop.component.css']
})
export class ViewMenuShopComponent implements OnInit, OnChanges {
  @Input() isAdmin: boolean = false;
  @Input() shopInfo: ShopInfo;
  @Output() reloadShopInfoEvent = new EventEmitter<boolean>();
  @Output() itemEvent = new EventEmitter<Item>();
  @Output() itemIdEvent = new EventEmitter<string>();

  itemId: string;
  itemEdit: Item;
  itemList: Item[];
  isRegisterItem: boolean = false;
  imageFile: any;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.itemList = this.shopInfo?.items;
    this.imageFile = this.commonService.converStringToBase64(this.shopInfo?.image);
  }

  tableHeaderMenu: TableHeader[] = [
    {
      column_name: 'Picture',
      field: 'picture',
      class_name: '',
    },
    {
      column_name: 'Name',
      field: 'name',
      class_name: '',
    },
    {
      column_name: 'Price',
      field: 'price',
      class_name: '',
    },
    {
      column_name: '',
      field: '',
      class_name: '',
    }
  ];

  setFlagRegisterItem(val: boolean): void{
    this.isRegisterItem = val;
  }

  // get info shop after register Item
  reloadShopInfo(val: boolean) {
    this.reloadShopInfoEvent.emit(true);
  }

  getItemEdit(item: Item) {
    this.itemEdit = item;
    console.log(item);
  }

  addCart(item: Item){
    this.itemEvent.emit(item);
  }

  getItemIdRemove(itemId: string){
    this.itemId = itemId;
  }

  removeItem(){
    this.itemIdEvent.emit(this.itemId);
  }
}
