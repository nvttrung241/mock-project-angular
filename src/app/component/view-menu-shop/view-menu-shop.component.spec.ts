import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMenuShopComponent } from './view-menu-shop.component';

describe('ViewMenuShopComponent', () => {
  let component: ViewMenuShopComponent;
  let fixture: ComponentFixture<ViewMenuShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMenuShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMenuShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
