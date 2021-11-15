import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInfoItemComponent } from './register-info-item.component';

describe('RegisterInfoItemComponent', () => {
  let component: RegisterInfoItemComponent;
  let fixture: ComponentFixture<RegisterInfoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInfoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
