import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialrecurringdepositComponent } from './financialrecurringdeposit.component';

describe('FinancialrecurringdepositComponent', () => {
  let component: FinancialrecurringdepositComponent;
  let fixture: ComponentFixture<FinancialrecurringdepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialrecurringdepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialrecurringdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
