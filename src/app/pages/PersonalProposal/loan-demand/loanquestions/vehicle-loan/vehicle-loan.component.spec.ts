import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleLoanComponent } from './vehicle-loan.component';

describe('VehicleLoanComponent', () => {
  let component: VehicleLoanComponent;
  let fixture: ComponentFixture<VehicleLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
