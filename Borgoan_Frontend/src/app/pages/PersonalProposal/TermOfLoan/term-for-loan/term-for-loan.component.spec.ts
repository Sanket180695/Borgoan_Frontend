import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermForLoanComponent } from './term-for-loan.component';

describe('TermForLoanComponent', () => {
  let component: TermForLoanComponent;
  let fixture: ComponentFixture<TermForLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermForLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermForLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
