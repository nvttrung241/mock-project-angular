import { Component, OnInit } from '@angular/core';
import { TableHeader } from '../model/tableHeader.model';
import { Item } from '../model/item.model';
import { ShopInfo } from '../model/shopInfo.model';
import { CreateOrderHostService } from './create-order-host.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../common-service/local-storage.service';
import { HubServiceService } from '../common-service/hub-service.service';
import { GlobalConstants } from '../constant/local-storage-constant';
import { ItemInCart } from '../model/item-in-cart.model';
import { ItemChoosed } from '../model/item-choosed.model';
import { CommonService } from '../common-service/common.service';

@Component({
  selector: 'app-create-order-host',
  templateUrl: './create-order-host.component.html',
  styleUrls: ['./create-order-host.component.css']
})
export class CreateOrderHostComponent implements OnInit {
  shopInfo: ShopInfo;
  shopId: string;
  cartId: string;
  cartInfo: any;
  customerId: string;
  isHost: boolean;
  itemMainList: ItemChoosed = new ItemChoosed();
  itemOtherList: ItemChoosed[] = [];
  isCompletedSubmit: boolean;
  isCompletedOrder: boolean;

  constructor(
    private createOrderHostService: CreateOrderHostService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private commonService: CommonService,
    private hubService: HubServiceService,
  ) { }

  ngOnInit(): void {
    // case do login
    this.customerId = this.localStorageService.get(GlobalConstants.CUSTOMER_ID);
    if(this.customerId != null){
      this.itemMainList.customerId = this.customerId;
      this.itemMainList.customerName = this.localStorageService.get(GlobalConstants.CUSTOMER_INFO).customerName;
      this.isCompletedSubmit = false;
      if(this.router.url.includes('/shop/')) {
        this.isHost = true;
        this.shopId = this.route.snapshot.paramMap.get('id');
        this.createOrderHostService.createCart(this.customerId, this.shopId).subscribe(
          (res) => {
            this.cartId = res.cartId;
            this.hubService.createHubConnectionCart(this.cartId);
            this.getInfoCart(res.cartId, true);
          },
          (err) => {
            alert(err.errors.title);
          }
        );
      } else if(this.router.url.includes('/cart/')) {
        this.isHost = false;
        this.cartId = this.route.snapshot.paramMap.get('id');
        this.hubService.createHubConnectionCart(this.cartId);
        this.getInfoCart(this.cartId, true);
      }
     
    } else {
      // case don't login
      if(this.router.url.includes('/shop/')) {
        this.shopId = this.route.snapshot.paramMap.get('id');
        this.localStorageService.set(GlobalConstants.SHOP_ID, this.shopId);
      } else if(this.router.url.includes('/cart/')) {
        this.cartId = this.route.snapshot.paramMap.get('id');
        this.localStorageService.set(GlobalConstants.CART_ID, this.cartId);
      }
      this.localStorageService.set(GlobalConstants.PREVIOUS_URL, this.router.url);
      this.router.navigate(['/customer/login']);
    }

    //realtime add item cart
    this.hubService.mainAddTemCart$.subscribe(isUpdate => {
      this.itemMainList = new ItemChoosed();
      this.itemOtherList = [];
      this.getInfoCart(this.cartId, false);
      // this.createOrderHostService.getInfoCart(this.cartId, false).subscribe(
      //   (res) => {
      //     this.cartInfo = res;
      //     this.handleItemChoosed(res.itemsInCart);
      //   },
      //   (err) => {
      //     alert(err.error);
      //   }
      // );
    })

    //realtime submit cart
    this.hubService.mainSubmitCart$.subscribe(obj => {
      if(this.isHost) {
        this.itemMainList = new ItemChoosed();
        this.itemOtherList = [];
        this.getInfoCart(this.cartId, false);
        alert('Guest ' + obj.customerId + ' submitted cart!!!');
      }
    })
  }

  tableHeaderMenu: TableHeader[] = [
    {
      column_name: 'Picture',
      field: '',
      class_name: '',
    },
    {
      column_name: 'Name/Price',
      field: '',
      class_name: '',
    },
    {
      column_name: 'Qty/Sub',
      field: '',
      class_name: '',
    }
  ]

  getInfoCart(cartId: string, isGetShop: boolean){
    this.createOrderHostService.getInfoCart(cartId, isGetShop).subscribe(
      (res) => {
        if(res.isSuccess){
          if(isGetShop){
            this.shopId = res.shopId;
            this.shopInfo = res.shop;
          }
          this.cartInfo = res;
          this.handleItemChoosed(res.itemsInCart);
        }else {
          alert(res.errorMessage)
          this.router.navigate(['/shop/']);
        }
      },
      (err) => {
        alert(err.errors.title);
      }
    );
  }

  addItemToCart(item: Item) {
    this.createOrderHostService.addItemToCart(item.itemId, this.customerId, this.cartId).subscribe(
      (res) => {
        if(res.isSuccess){
          console.log('Add item to cart success');
        }else {
          alert(res.errorMessage);
        }
      },
      (err) => {
        alert(err.error);
      }
    );
  }

  removeItemFromCart(item: Item) {
    this.createOrderHostService.removeItemFromCart(item.itemId, this.customerId, this.cartId).subscribe(
      (res) => {
        if(res.isSuccess){
          console.log('Remove item to cart success');
        }else {
          alert(res.errorMessage);
        }
      },
      (err) => {
        alert(err.error);
      }
    );
  }

  handleItemChoosed(itemsInCart: ItemInCart[]){
    itemsInCart.forEach(el => {
      this.checkItem(el);
    });
    // check complete sunmite for guest
    this.isCompletedSubmit = this.checkCompletedSubmit(this.itemMainList.items);
     // check complete sunmite for host
    let isCompletedOrder = true;
    this.itemOtherList.forEach(el => {
      if(isCompletedOrder){
        isCompletedOrder = this.checkCompletedSubmit(el.items);
      }
    });
    this.isCompletedOrder = isCompletedOrder;
  }

  checkItem(item: ItemInCart): any{
    if(item.customerId == this.customerId){
      this.itemMainList.customerId = item.customerId;
      this.itemMainList.customerName = item.customerName;
      this.itemMainList.items.push(item);
    }else {
      // case itemChoosed of old customer
      let isAdd = false;
      this.itemOtherList.forEach(e => {
        if(!isAdd && e.customerId == item.customerId){
          e.items.push(item);
          isAdd = true;
        }
      });
      
      // case itemChoosed of new customer
      if(!isAdd){
        let itemChoosed = new ItemChoosed();
        itemChoosed.customerId = item.customerId;
        itemChoosed.customerName = item.customerName;
        itemChoosed.items.push(item);
        this.itemOtherList?.push(itemChoosed);
      }
    }
  }

  submitCart(){
    let params = {
      "customerId": this.customerId,
      "cartId": this.cartId,
      "items":[]
    }

    this.itemMainList.items.forEach(e => {
      let item = {
        "amount": e.amount,
        "itemId": e.itemId,
        "isDeleted": false
      }
      params.items.push(item);
    });

    this.createOrderHostService.submitCart(params).subscribe(
      (res) => {
        this.isCompletedSubmit = true;
        this.isCompletedOrder = true;
        if(this.isHost){
          let param = {
            "cartId": this.cartId,
            "deliveryInformation": "a"
          }
          this.createOrderHostService.createOrder(param).subscribe(
            (res) => {
              console.log(res);
              if(res.isSuccess){
                this.router.navigate(['/tracking/' + res.orderId])
              } else {
                alert(res.errorMessage);
              }
            },
            (err) => {
              alert('create order failed');
            }
          );
        }
      },
      (err) => {
        alert('Submit Cart Failed');
      }
    );
  }

  checkCompletedSubmit(items: ItemInCart[]): boolean{
    let isReadyToOrder = true;
    items.forEach(e => {
      if(!e.readyToOrder){
        isReadyToOrder = false;
      }
    });
    return isReadyToOrder;
  }

  checkCompletedOrder(items: ItemInCart[]): boolean{
    if(items != null){
      let isCompleted = true;
      items.forEach(e => {
        if(this.customerId != e.customerId && !e.readyToOrder){
          isCompleted = false;
        }
      });
      return isCompleted;
    }
  }
}
