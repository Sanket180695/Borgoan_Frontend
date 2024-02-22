import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeInBankComponent } from './deposite-in-bank.component';

describe('DepositeInBankComponent', () => {
  let component: DepositeInBankComponent;
  let fixture: ComponentFixture<DepositeInBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositeInBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeInBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
