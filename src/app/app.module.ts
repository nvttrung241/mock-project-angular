import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QrCodeModule } from 'ng-qrcode';

import { CreateOrderHostComponent } from './create-order-host/create-order-host.component';
import { CreateShopComponent } from './create-shop/create-shop.component';
import { ViewMenuOrderShopComponent } from './view-menu-order-shop/view-menu-order-shop.component';
import { CreateInfoHostComponent } from './create-info-host/create-info-host.component';
import { TrackingComponent } from './tracking/tracking.component';
import { RegisterInfoCustomerComponent } from './component/register-info-customer/register-info-customer.component';
import { ViewInfoShopComponent } from './component/view-info-shop/view-info-shop.component';
import { ViewMenuShopComponent } from './component/view-menu-shop/view-menu-shop.component';
import { RegisterInfoShopMenuComponent } from './component/register-info-shop-menu/register-info-shop-menu.component';
import { RegisterInfoItemComponent } from './component/register-info-item/register-info-item.component';
import { ViewAllShopComponent } from './view-all-shop/view-all-shop.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ViewAllShopComponent,
  },
  {
    path: 'admin',
    component: CreateShopComponent,
  },
  {
    path: 'admin/:id',
    component: ViewMenuOrderShopComponent,
  },
  {
    path: 'shop',
    component: ViewAllShopComponent,
  },
  {
    path: 'shop/:id',
    component: CreateOrderHostComponent,
  },
  {
    path: 'cart/:id',
    component: CreateOrderHostComponent,
  },
  {
    path: 'tracking',
    component: TrackingComponent,
  },
  {
    path: 'tracking/:id',
    component: TrackingComponent,
  },
  {
    path: 'customer/login',
    component: CreateInfoHostComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CreateOrderHostComponent,
    CreateShopComponent,
    ViewMenuOrderShopComponent,
    CreateInfoHostComponent,
    TrackingComponent,
    RegisterInfoCustomerComponent,
    ViewInfoShopComponent,
    ViewMenuShopComponent,
    RegisterInfoShopMenuComponent,
    RegisterInfoItemComponent,
    ViewAllShopComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QrCodeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
