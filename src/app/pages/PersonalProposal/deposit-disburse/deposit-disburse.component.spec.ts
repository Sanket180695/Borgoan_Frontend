import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositDisburseComponent } from './deposit-disburse.component';

describe('DepositDisburseComponent', () => {
  let component: DepositDisburseComponent;
  let fixture: ComponentFixture<DepositDisburseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositDisburseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositDisburseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
