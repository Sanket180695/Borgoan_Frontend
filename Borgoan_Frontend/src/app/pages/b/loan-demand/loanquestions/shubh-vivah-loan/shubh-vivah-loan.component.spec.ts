import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShubhVivahLoanComponent } from './shubh-vivah-loan.component';

describe('ShubhVivahLoanComponent', () => {
  let component: ShubhVivahLoanComponent;
  let fixture: ComponentFixture<ShubhVivahLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShubhVivahLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShubhVivahLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
