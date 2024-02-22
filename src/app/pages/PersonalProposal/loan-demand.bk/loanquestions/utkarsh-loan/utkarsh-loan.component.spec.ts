import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtkarshLoanComponent } from './utkarsh-loan.component';

describe('UtkarshLoanComponent', () => {
  let component: UtkarshLoanComponent;
  let fixture: ComponentFixture<UtkarshLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtkarshLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtkarshLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
