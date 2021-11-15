import { Injectable, EventEmitter } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions,
} from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HubServiceService {
  hubUrl = environment.hubUrl;
  private hubConnectionCart: HubConnection = {} as any;
  private hubConnectionShop: HubConnection = {} as any;
  private hubConnectionOrder: HubConnection = {} as any;
  // realtime change status
  private connectionChangeStatusOrder: Subject<string> = new Subject<string>();
  mainStatus$ = this.connectionChangeStatusOrder.asObservable();

  // realtime add item Cart
  private connectionAddItemCart: Subject<boolean> = new Subject<boolean>();
  mainAddTemCart$ = this.connectionAddItemCart.asObservable();

  // realtime remove item Cart
  private connectionremoveItemCart: Subject<boolean> = new Subject<boolean>();
  mainRemoveTemCart$ = this.connectionremoveItemCart.asObservable();

  // realtime submit cart
  private connectionSubmitCart: Subject<any> = new Subject<any>();
  mainSubmitCart$ = this.connectionSubmitCart.asObservable();

  // realtime new order
  private connectionNewOrder: Subject<any> = new Subject<any>();
  mainNewOrder$ = this.connectionNewOrder.asObservable();

  // realtime cancel order
  private connectionCancelOrder: Subject<any> = new Subject<any>();
  mainCancelOrder$ = this.connectionCancelOrder.asObservable();

  //cart
  createHubConnectionCart(cartId: string) {
    this.hubConnectionCart = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/cart?cart=' + cartId, {
        withCredentials: false,
      } as IHttpConnectionOptions)
      .withAutomaticReconnect()
      .build();

    this.hubConnectionCart.start().catch((error: any) => console.log(error));

    this.hubConnectionCart.on('SubmitItems', (obj: any) => {
      this.connectionSubmitCart.next(obj);
      console.log('SubmitItemsInCart 3---->');
      console.log(obj);
    });
    this.hubConnectionCart.on('AddItemToCart', (id: any) => {
      this.connectionAddItemCart.next(true);
      console.log('AddItemToCart ---->');
      console.log(id);
    });
    this.hubConnectionCart.on('RemoveItemFromCart', (id: any) => {
      this.connectionAddItemCart.next(true);
      console.log('RemoveItemFromCart ---->');
      console.log(id);
    });
  }
  stopHubConnectionCart() {
    this.hubConnectionCart.stop().catch((error: any) => console.log(error));
  }

  // shop
  createHubConnectionShop(shopId: string) {
    this.hubConnectionShop = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/shop?shop=' + shopId, {
        withCredentials: false,
      } as IHttpConnectionOptions)
      .withAutomaticReconnect()
      .build();

    this.hubConnectionShop.start().catch((error: any) => console.log(error));
    this.hubConnectionShop.on('NewOrder', (obj: any) => {
      this.connectionNewOrder.next(obj);
      console.log(obj);
    });
    // this.hubConnectionShop.on('CancelOrder', (id: any) => {
    //   this.connectionCancelOrder.next(false);
    //   console.log(id);
    // });
  }
  stopHubConnectionShop() {
    this.hubConnectionShop.stop().catch((error: any) => console.log(error));
  }

  // order
  createHubConnectionOrder(orderId: string) {
    this.hubConnectionOrder = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/order?order=' + orderId, {
        withCredentials: false,
      } as IHttpConnectionOptions)
      .withAutomaticReconnect()
      .build();

    this.hubConnectionOrder.start().catch((error: any) => console.log(error));
    this.hubConnectionOrder.on('ChangeOrderStatus', (obj: any) => {
      this.connectionChangeStatusOrder.next(obj.newStatus);
      console.log('ChangeOrderStatus');
    });
    
    this.hubConnectionShop.on('CancelOrder', (id: any) => {
      this.connectionCancelOrder.next(false);
      console.log(id);
    });
    // this.hubConnectionOrder.on('CancelOrder', (id: any) => {
    //   console.log(id);
    // });
  }
  stopHubConnectionOrder() {
    this.hubConnectionOrder.stop().catch((error: any) => console.log(error));
  }
}
