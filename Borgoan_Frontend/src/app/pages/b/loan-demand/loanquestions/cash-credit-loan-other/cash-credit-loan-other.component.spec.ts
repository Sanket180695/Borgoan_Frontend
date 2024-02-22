import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCreditLoanOtherComponent } from './cash-credit-loan-other.component';

describe('CashCreditLoanOtherComponent', () => {
  let component: CashCreditLoanOtherComponent;
  let fixture: ComponentFixture<CashCreditLoanOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashCreditLoanOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCreditLoanOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
