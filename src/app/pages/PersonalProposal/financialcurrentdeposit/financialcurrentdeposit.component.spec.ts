import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialcurrentdepositComponent } from './financialcurrentdeposit.component';

describe('FinancialcurrentdepositComponent', () => {
  let component: FinancialcurrentdepositComponent;
  let fixture: ComponentFixture<FinancialcurrentdepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialcurrentdepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialcurrentdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
