import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourAndTravelLoanComponent } from './tour-and-travel-loan.component';

describe('TourAndTravelLoanComponent', () => {
  let component: TourAndTravelLoanComponent;
  let fixture: ComponentFixture<TourAndTravelLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourAndTravelLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourAndTravelLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
