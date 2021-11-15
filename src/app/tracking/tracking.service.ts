import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrackingService {
    constructor(private http: HttpClient) { }

    getOrder(orderId: string): Observable<any> {
        return this.http.get<any>('http://localhost:8080/api/Order/' + orderId);
    }

    getAllOrderOfCustomer(customerId: string): Observable<any> {
        return this.http.get<any>('http://localhost:8080/api/Order/' + customerId + '/customer/all');
    }
}