import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInfoShopComponent } from './view-info-shop.component';

describe('ViewInfoShopComponent', () => {
  let component: ViewInfoShopComponent;
  let fixture: ComponentFixture<ViewInfoShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInfoShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInfoShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
