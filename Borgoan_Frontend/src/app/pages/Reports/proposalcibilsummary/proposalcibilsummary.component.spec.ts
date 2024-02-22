import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalcibilsummaryComponent } from './proposalcibilsummary.component';

describe('ProposalcibilsummaryComponent', () => {
  let component: ProposalcibilsummaryComponent;
  let fixture: ComponentFixture<ProposalcibilsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalcibilsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalcibilsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
