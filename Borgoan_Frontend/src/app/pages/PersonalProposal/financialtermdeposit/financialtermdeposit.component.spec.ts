import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialtermdepositComponent } from './financialtermdeposit.component';

describe('FinancialtermdepositComponent', () => {
  let component: FinancialtermdepositComponent;
  let fixture: ComponentFixture<FinancialtermdepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialtermdepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialtermdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
