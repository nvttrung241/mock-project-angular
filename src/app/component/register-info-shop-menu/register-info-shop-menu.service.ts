import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RegisterInfoShopMenuService {
    constructor(private http: HttpClient) { }

    onRegister(formData: FormData): any {
        return this.http.post<any>('http://localhost:8080/api/Shop/register', formData);
    }

    modifyShop(formData: FormData){
        return this.http.put<any>('http://localhost:8080/api/Shop', formData);
    }
}