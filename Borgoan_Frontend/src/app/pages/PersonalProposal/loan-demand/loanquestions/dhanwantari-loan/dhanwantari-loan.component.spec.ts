import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhanwantariLoanComponent } from './dhanwantari-loan.component';

describe('DhanwantariLoanComponent', () => {
  let component: DhanwantariLoanComponent;
  let fixture: ComponentFixture<DhanwantariLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhanwantariLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhanwantariLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
