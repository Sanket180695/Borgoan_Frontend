import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanoffComponent } from './loanoff.component';

describe('LoanoffComponent', () => {
  let component: LoanoffComponent;
  let fixture: ComponentFixture<LoanoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanoffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
