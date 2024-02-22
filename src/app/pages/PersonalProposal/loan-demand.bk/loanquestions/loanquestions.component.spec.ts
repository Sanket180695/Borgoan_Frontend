import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanquestionsComponent } from './loanquestions.component';

describe('LoanquestionsComponent', () => {
  let component: LoanquestionsComponent;
  let fixture: ComponentFixture<LoanquestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanquestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
