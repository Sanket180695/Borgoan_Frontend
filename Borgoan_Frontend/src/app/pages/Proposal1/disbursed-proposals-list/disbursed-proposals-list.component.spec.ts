import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursedProposalsListComponent } from './disbursed-proposals-list.component';

describe('DisbursedProposalsListComponent', () => {
  let component: DisbursedProposalsListComponent;
  let fixture: ComponentFixture<DisbursedProposalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisbursedProposalsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursedProposalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
