import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionDetailsMasterListComponent } from './deduction-details-master-list.component';

describe('DeductionDetailsMasterListComponent', () => {
  let component: DeductionDetailsMasterListComponent;
  let fixture: ComponentFixture<DeductionDetailsMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductionDetailsMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionDetailsMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
