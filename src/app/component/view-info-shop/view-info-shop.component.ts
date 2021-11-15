import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ShopInfo } from 'src/app/model/shopInfo.model';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-view-info-shop',
  templateUrl: './view-info-shop.component.html',
  styleUrls: ['./view-info-shop.component.css']
})
export class ViewInfoShopComponent implements OnInit, OnChanges {
  @Input() isAdmin: boolean;
  @Input() shopInfo: ShopInfo;
  @Input() cartId: string;
  @Output() reloadShopInfoEvent = new EventEmitter<boolean>();
  @Output() isViewMenuEvent = new EventEmitter<boolean>();

  urlShare: string;
  isViewMenu: boolean = true;
  imageFile: any;
  
  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.imageFile = this.commonService.converStringToBase64(this.shopInfo?.image);
    this.shopInfo = this.shopInfo;
  }

  switchMenuOrder(): void {
    this.isViewMenuEvent.emit(!this.isViewMenu);
    this.isViewMenu = !this.isViewMenu;
  }

  createQRcode(path: string, id: string){
    this.urlShare = 'http://localhost:4200/' + path + '/' + id;
  }

  reloadShopInfo() {
    this.reloadShopInfoEvent.emit(true);
  }
}
