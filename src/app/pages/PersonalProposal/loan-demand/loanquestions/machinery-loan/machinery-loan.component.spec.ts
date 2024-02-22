import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryLoanComponent } from './machinery-loan.component';

describe('MachineryLoanComponent', () => {
  let component: MachineryLoanComponent;
  let fixture: ComponentFixture<MachineryLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
