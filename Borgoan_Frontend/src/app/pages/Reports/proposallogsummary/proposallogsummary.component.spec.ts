import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposallogsummaryComponent } from './proposallogsummary.component';

describe('ProposallogsummaryComponent', () => {
  let component: ProposallogsummaryComponent;
  let fixture: ComponentFixture<ProposallogsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposallogsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposallogsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
