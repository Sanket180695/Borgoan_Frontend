import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankLoanInfoComponent } from './bank-loan-info.component';

describe('BankLoanInfoComponent', () => {
  let component: BankLoanInfoComponent;
  let fixture: ComponentFixture<BankLoanInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankLoanInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankLoanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
