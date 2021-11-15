import { Component, OnInit } from '@angular/core';
import { ViewAllShopService } from './view-all-shop.service';
import { CommonService } from '../common-service/common.service';
import { ShopInfo } from '../model/shopInfo.model';
import { Router } from '@angular/router';
import { LocalStorageService } from '../common-service/local-storage.service';
import { GlobalConstants } from '../constant/local-storage-constant';

@Component({
  selector: 'app-view-all-shop',
  templateUrl: './view-all-shop.component.html',
  styleUrls: ['./view-all-shop.component.css']
})
export class ViewAllShopComponent implements OnInit {
  infoAllShop: ShopInfo[];

  constructor(
    private viewAllShopService: ViewAllShopService,
    //convert base64 to image at HTML, don't delete
    private commonService: CommonService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.viewAllShopService.getAllShop().subscribe(
      (res) => {
        this.infoAllShop = res;
        console.log(res);
      },
      (err) => {
        alert(err.errors.title);
      }
    );
  }

  createCartShop(shopId: string) {
    this.localStorageService.set(GlobalConstants.SHOP_ID, shopId);
    this.router.navigate(['/shop/' + shopId]);
  }

}
