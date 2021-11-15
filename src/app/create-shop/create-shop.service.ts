import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CreateShopService {
    constructor(
        private http: HttpClient
    ){}

    onLoginShop(param: string): any{
        let params = {"phoneNumber": param};
        return this.http.post<any>('http://localhost:8080/api/Shop/login', params);
    }
}