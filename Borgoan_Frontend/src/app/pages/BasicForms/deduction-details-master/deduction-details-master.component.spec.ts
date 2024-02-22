import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionDetailsMasterComponent } from './deduction-details-master.component';

describe('DeductionDetailsMasterComponent', () => {
  let component: DeductionDetailsMasterComponent;
  let fixture: ComponentFixture<DeductionDetailsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductionDetailsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionDetailsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
