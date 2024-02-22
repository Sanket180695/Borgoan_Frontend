import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposeOfLoanComponent } from './purpose-of-loan.component';

describe('PurposeOfLoanComponent', () => {
  let component: PurposeOfLoanComponent;
  let fixture: ComponentFixture<PurposeOfLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurposeOfLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurposeOfLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
