import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMenuOrderShopComponent } from './view-menu-order-shop.component';

describe('ViewMenuOrderShopComponent', () => {
  let component: ViewMenuOrderShopComponent;
  let fixture: ComponentFixture<ViewMenuOrderShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMenuOrderShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMenuOrderShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
