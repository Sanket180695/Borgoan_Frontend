import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDiscoumtingLoanComponent } from './rent-discoumting-loan.component';

describe('RentDiscoumtingLoanComponent', () => {
  let component: RentDiscoumtingLoanComponent;
  let fixture: ComponentFixture<RentDiscoumtingLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentDiscoumtingLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentDiscoumtingLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
