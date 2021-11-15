import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RegisterInfoItemService {
    constructor(private http: HttpClient) { }

    onRegisterItem(formData: FormData): any {
        return this.http.post<any>('http://localhost:8080/api/Item/create', formData);
    }

    onModifyItem(formData: FormData): any {
        return this.http.put<any>('http://localhost:8080/api/Item', formData);
    }
}