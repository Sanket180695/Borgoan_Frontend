import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantypeinstallmentfrequencywiseComponent } from './loantypeinstallmentfrequencywise.component';

describe('LoantypeinstallmentfrequencywiseComponent', () => {
  let component: LoantypeinstallmentfrequencywiseComponent;
  let fixture: ComponentFixture<LoantypeinstallmentfrequencywiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantypeinstallmentfrequencywiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantypeinstallmentfrequencywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
