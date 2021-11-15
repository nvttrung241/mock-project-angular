import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderHostComponent } from './create-order-host.component';

describe('CreateOrderHostComponent', () => {
  let component: CreateOrderHostComponent;
  let fixture: ComponentFixture<CreateOrderHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
