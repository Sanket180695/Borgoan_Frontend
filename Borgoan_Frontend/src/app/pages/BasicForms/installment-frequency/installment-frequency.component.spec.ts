import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentFrequencyComponent } from './installment-frequency.component';

describe('InstallmentFrequencyComponent', () => {
  let component: InstallmentFrequencyComponent;
  let fixture: ComponentFixture<InstallmentFrequencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallmentFrequencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
