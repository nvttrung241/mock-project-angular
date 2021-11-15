import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInfoCustomerComponent } from './register-info-customer.component';

describe('RegisterInfoCustomerComponent', () => {
  let component: RegisterInfoCustomerComponent;
  let fixture: ComponentFixture<RegisterInfoCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInfoCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInfoCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
