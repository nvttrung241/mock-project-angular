import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Item } from '../model/item.model';
import { ShopInfo } from '../model/shopInfo.model';
import { Order } from '../model/order.model';

@Injectable({
    providedIn: 'root'
})
export class ShopService {
    shopInfo: ShopInfo;
    constructor(private http: HttpClient) { }

    getInfoShop(shopId: string): Observable<ShopInfo> {
        return this.http.get<ShopInfo>('http://localhost:8080/api/Shop/' + shopId);
    }

    getAllOrderShop(shopId: string): Observable<any> {
        return this.http.get<any>('http://localhost:8080/api/Order/' + shopId + '/shop/all');
    }

    updateStatus(params: any) {
        // let options = {
        //     headers: new HttpHeaders({
        //         'Access-Control-Allow-Origin': 'http://localhost:8080',
        //         'Access-Control-Allow-Credentials': 'true'
        //     }),
        //     params: new HttpParams(params),
        //   };
        // let headers = new Headers();
        // headers.append('Access-Control-Allow-Origin', );
        // headers.append(, 'true');
        return this.http.put<any>('http://localhost:8080/api/Order/status', params);
    }

    cancelOrder(params: any){
        return this.http.put<any>('http://localhost:8080/api/Order/cancel', params);
    }

    removeItem(params: any){
        let options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json-patch+json',
            }),
            body: params,
          };
        return this.http.delete('http://localhost:8080/api/Item', options);
    }
}