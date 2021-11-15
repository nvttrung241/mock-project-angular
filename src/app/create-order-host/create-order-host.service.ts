import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopInfo } from '../model/shopInfo.model';

@Injectable({
    providedIn: 'root'
})
export class CreateOrderHostService {
    constructor(
        private http: HttpClient
    ){}

    getInfoShop(shopId: string): Observable<ShopInfo> {
        return this.http.get<ShopInfo>('http://localhost:8080/api/Shop/' + shopId);
    }

    getInfoCart(cartId: string, isGetshop: boolean): Observable<any> {
        return this.http.get<any>('http://localhost:8080/api/Cart/' + cartId + '?getShop=' + isGetshop);
    }

    createCart(customerId: string, shopId: string){
        let params = {
            "customerId": customerId,
            "shopId": shopId
          };
        return this.http.post<any>('http://localhost:8080/api/Cart/create', params);
    }

    addItemToCart(itemId: string, customerId: string, cartId: string) {
        let params = {
            "itemId": itemId,
            "customerId": customerId,
            "cartId": cartId
          };
        return this.http.post<any>('http://localhost:8080/api/Cart/add/item', params);
    }

    removeItemFromCart(itemId: string, customerId: string, cartId: string){
        let params = {
            "itemId": itemId,
            "customerId": customerId,
            "cartId": cartId
          };
        return this.http.post<any>('http://localhost:8080/api/Cart/remove/item', params);
    }

    submitCart(params: any){
        return this.http.post<any>('http://localhost:8080/api/Cart/submit', params);
    }

    createOrder(params: any){
        return this.http.post<any>('http://localhost:8080/api/Order', params);
    }

}