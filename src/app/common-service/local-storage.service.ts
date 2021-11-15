import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService implements OnInit {
    sessionStorage: Storage;
    // changes$ = new Subject();
    constructor(){
        this.sessionStorage = window.sessionStorage;
    }

    ngOnInit(){
    }

    get(key: string): any {
        // if (this.isLocalStorageSupported) {
          return JSON.parse(this.sessionStorage.getItem(key));
        // }
        // return null;
    }
    
    set(key: string, value: any): void {
    // if (this.isLocalStorageSupported) {
        this.sessionStorage.setItem(key, JSON.stringify(value));
        // this.changes$.next({
        // type: 'set',
        // key,
        // value
        // });
        // return true;
    }

    remove(key: string): any {
    // if (this.isLocalStorageSupported) {
        return this.sessionStorage.removeItem(key);
        // this.changes$.next({
        // type: 'remove',
        // key
        // });
        // return true;
    }
    // get isLocalStorageSupported(): boolean {
    // return !!this.localStorage
    // }

}