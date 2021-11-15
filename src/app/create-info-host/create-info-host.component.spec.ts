import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInfoHostComponent } from './create-info-host.component';

describe('CreateInfoHostComponent', () => {
  let component: CreateInfoHostComponent;
  let fixture: ComponentFixture<CreateInfoHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInfoHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInfoHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
