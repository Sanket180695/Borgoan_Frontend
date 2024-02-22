import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateToUpLoanComponent } from './real-estate-to-up-loan.component';

describe('RealEstateToUpLoanComponent', () => {
  let component: RealEstateToUpLoanComponent;
  let fixture: ComponentFixture<RealEstateToUpLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealEstateToUpLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateToUpLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
