import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllShopComponent } from './view-all-shop.component';

describe('ViewAllShopComponent', () => {
  let component: ViewAllShopComponent;
  let fixture: ComponentFixture<ViewAllShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
