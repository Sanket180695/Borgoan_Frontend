import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalFilterwiseReportComponent } from './proposal-filterwise-report.component';

describe('ProposalFilterwiseReportComponent', () => {
  let component: ProposalFilterwiseReportComponent;
  let fixture: ComponentFixture<ProposalFilterwiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalFilterwiseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalFilterwiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
