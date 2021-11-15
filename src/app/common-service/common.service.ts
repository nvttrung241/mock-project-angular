import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor(
        private _sanitizer: DomSanitizer
    ){}

    converStringToBase64(image: string): any{
        if(image != null && image != undefined){
            return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + image);
        }
        return '';
    }

}