import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentFrequencyListComponent } from './installment-frequency-list.component';

describe('InstallmentFrequencyListComponent', () => {
  let component: InstallmentFrequencyListComponent;
  let fixture: ComponentFixture<InstallmentFrequencyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallmentFrequencyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentFrequencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
