import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositloanDisburseComponent } from './depositloan-disburse.component';

describe('DepositloanDisburseComponent', () => {
  let component: DepositloanDisburseComponent;
  let fixture: ComponentFixture<DepositloanDisburseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositloanDisburseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositloanDisburseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
