import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CreateInfoHostService {
    constructor(
        private http: HttpClient
    ){}

    onLoginCustomer(param: string): any{
        let params = {"phoneNumber": param};
        return this.http.post<any>('http://localhost:8080/api/Customer/login', params);
    }
}