import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorForLoanComponent } from './guarantor-for-loan.component';

describe('GuarantorForLoanComponent', () => {
  let component: GuarantorForLoanComponent;
  let fixture: ComponentFixture<GuarantorForLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarantorForLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorForLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
