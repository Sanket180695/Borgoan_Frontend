import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDemandComponent } from './loan-demand.component';

describe('LoanDemandComponent', () => {
  let component: LoanDemandComponent;
  let fixture: ComponentFixture<LoanDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
