import { Component, OnInit } from '@angular/core';
import { TableHeader } from '../model/tableHeader.model';
import { TrackingService } from './tracking.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common-service/common.service';
import { GlobalConstants } from '../constant/local-storage-constant';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HubServiceService } from '../common-service/hub-service.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  orderId: string;
  orderObj: any;
  statusList = GlobalConstants.statusList;
  infoAllOrder: any;
  isCancelOrder: boolean = false;
  
  constructor(
    private commonService: CommonService,
    private trackingService: TrackingService,
    private hubService: HubServiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.isCancelOrder = false;
    let orderId = this.route.snapshot.paramMap.get('id');
    if(orderId != null){
      this.getOrder(orderId);
    }

    this.orderObj = this.hubService.mainStatus$.subscribe(status => {
      this.orderObj.status = status;
      return this.orderObj;
    })

    this.hubService.mainCancelOrder$.subscribe(flag => {
      console.log('realtime cancel');
      this.isCancelOrder = true;
    })
  }

  orderForm = new FormGroup({
    orderId: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(6), Validators.minLength(6)]
    }),
  });
  
  getOrder(orderId: string){
    this.trackingService.getOrder(orderId).subscribe(
      (res) => {
        console.log(res);
        this.hubService.createHubConnectionShop(res.shopId);
        this.hubService.createHubConnectionOrder(orderId);
        this.orderObj = res;
        if(res.status === 'Cancelled'){
          this.isCancelOrder = true;
        }
      },
      (err) => {
        alert("Order ID is invalid");
      }
    );
  }

  tableHeaderMenu: TableHeader[] = [
    {
      column_name: 'Picture',
      field: '',
      class_name: '',
    },
    {
      column_name: 'Name/Price',
      field: '',
      class_name: '',
    },
    {
      column_name: 'Qty/Sub',
      field: '',
      class_name: '',
    }
  ]
  
  checkStatus(value: number): string{
    if(this.statusList[value]?.text === this.orderObj?.status){
      return 'active';
    }
    return '';
  }

  searchOrder(){
    this.isCancelOrder = false;
    this.orderId = this.orderForm.get('orderId').value;
    this.getOrder(this.orderId);
  }
}
