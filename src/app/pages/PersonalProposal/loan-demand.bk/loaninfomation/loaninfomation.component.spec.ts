import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaninfomationComponent } from './loaninfomation.component';

describe('LoaninfomationComponent', () => {
  let component: LoaninfomationComponent;
  let fixture: ComponentFixture<LoaninfomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaninfomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaninfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
