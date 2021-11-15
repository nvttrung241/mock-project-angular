import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInfoShopMenuComponent } from './register-info-shop-menu.component';

describe('RegisterInfoShopMenuComponent', () => {
  let component: RegisterInfoShopMenuComponent;
  let fixture: ComponentFixture<RegisterInfoShopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInfoShopMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInfoShopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
