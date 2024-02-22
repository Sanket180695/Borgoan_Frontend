import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankloanschemesComponent } from './bankloanschemes.component';

describe('BankloanschemesComponent', () => {
  let component: BankloanschemesComponent;
  let fixture: ComponentFixture<BankloanschemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankloanschemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankloanschemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
