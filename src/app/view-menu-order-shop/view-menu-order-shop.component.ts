import { Component, OnInit } from '@angular/core';
import { TableHeader } from '../model/tableHeader.model';
import { Order } from '../model/order.model';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from './view-menu-order-shop.service';
import { ShopInfo } from '../model/shopInfo.model';
import { Item } from '../model/item.model';
import { GlobalConstants } from '../constant/local-storage-constant';
import { HubServiceService } from '../common-service/hub-service.service';

@Component({
  selector: 'app-view-menu-order-shop',
  templateUrl: './view-menu-order-shop.component.html',
  styleUrls: ['./view-menu-order-shop.component.css']
})
export class ViewMenuOrderShopComponent implements OnInit {

  isViewMenu: boolean = true;
  shopId: string;
  shopInfo: ShopInfo;
  itemEdit: Item;
  orderList: Order[];
  orderDetailView: any;
  statusList = GlobalConstants.statusList;
  indexStatus: string = '0';

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private hubService: HubServiceService,
    ) { }

  ngOnInit(): void {
    this.shopId = this.route.snapshot.paramMap.get('id');
    this.getShop(this.shopId);
    this.getOrderShop(this.shopId);

    this.hubService.createHubConnectionShop(this.shopId);
    this.hubService.mainNewOrder$.subscribe(obj => {
      this.getOrderShop(this.shopId);
      alert('Added 1 new order!!!');
    })
  }
  
  getShop(shopId: string){
    this.shopService.getInfoShop(shopId).subscribe(
      (res) => { 
        res.shopId = shopId;
        this.shopInfo = res;
      },
      (err) => {
        alert(err);
      }
    );
  }

  getOrderShop(shopId: string) {
    this.shopService.getAllOrderShop(shopId).subscribe(
      (res) => {
        this.orderList = res.orders;
      },
      (err) => {
        alert(err.errors.title);
      }
    );
  }
  
  // --------------------------------
  tableHeaderOrder: TableHeader[] = [
    {
      column_name: '#',
      field: 'orderId',
      class_name: '',
    },
    {
      column_name: 'Customer Name',
      field: 'customerName',
      class_name: '',
    },
    {
      column_name: 'Customer Phone',
      field: 'customerPhoneNumber',
      class_name: '',
    },
    {
      column_name: 'Total',
      field: 'totalPrice',
      class_name: '',
    },
    {
      column_name: 'Status',
      field: 'status',
      class_name: '',
    }
  ]
  // ------------------------------------------------
  tableHeaderOrderDetail: TableHeader[] = [
    {
      column_name: 'Item',
      field: 'itemName',
      class_name: '',
    },
    {
      column_name: 'Price',
      field: 'price',
      class_name: '',
    },
    {
      column_name: 'Quantity',
      field: 'amount',
      class_name: '',
    },
    {
      column_name: 'Sub Total',
      field: '',
      class_name: '',
    }
  ]


  // -----------------------------------------------------------------------------------
  // dislay menu order
  switchMenuOrder(val: boolean) {
    this.isViewMenu = val;
  }

  // get info shop after register Item
  reloadShopInfo() {
    this.getShop(this.shopId);
  }

  viewOrderDetail(order: any) {
    this.orderDetailView = order;
    // check index status
    this.statusList.forEach(e => {
      if(e.text == this.orderDetailView.status){
        this.indexStatus = e.value;
      }
    });
    
    console.log(this.orderDetailView);
  }

  onChange(index: number) {
    let params = {
      "orderId": this.orderDetailView.orderId,
      "orderStatus": this.statusList[index].text,
      "customerId": this.orderDetailView.customerId,
      "shopId": this.orderDetailView.shopId,
    }
    this.shopService.updateStatus(params).subscribe(
      (res) => {
        if(res.isSuccess){
          this.getOrderShop(this.shopId);
        }else {
          alert(res.errorMessage);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeItem(itemId: string){
    let params = {
      "shopId": this.shopId,
      "itemId": itemId
    }
    console.log(params);
    this.shopService.removeItem(params).subscribe(
      (res) => {
        this.reloadShopInfo();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  closeHubShop(){

  }

  cancelOrder(orderDetailView: any){
    console.log(orderDetailView);
    let params = {
      "orderId": orderDetailView.orderId,
      "customerId": orderDetailView.customerId
    }
    this.shopService.cancelOrder(params).subscribe(
      (res) => {
        console.log(res);
        if(res.isSuccess) {
          this.getOrderShop(this.shopId);
        }else {
          alert(res.errorMessage);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}