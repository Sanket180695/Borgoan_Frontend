import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentapprovalComponent } from './paymentapproval.component';

describe('PaymentapprovalComponent', () => {
  let component: PaymentapprovalComponent;
  let fixture: ComponentFixture<PaymentapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
