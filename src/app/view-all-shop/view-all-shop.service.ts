import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopInfo } from '../model/shopInfo.model';

@Injectable({
    providedIn: 'root'
})
export class ViewAllShopService {
    constructor(private http: HttpClient) { }

    getAllShop(): Observable<any> {
        return this.http.get<ShopInfo>('http://localhost:8080/api/Shop/all');
    }

    getAllOrderShop(shopId: string): Observable<any> {
        return this.http.get<any>('http://localhost:8080/api/Order' + shopId + 'shop/all');
    }
}