import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlierLoanInfoComponent } from './earlier-loan-info.component';

describe('EarlierLoanInfoComponent', () => {
  let component: EarlierLoanInfoComponent;
  let fixture: ComponentFixture<EarlierLoanInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarlierLoanInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarlierLoanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
