import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalextrainformationsummaryComponent } from './proposalextrainformationsummary.component';

describe('ProposalextrainformationsummaryComponent', () => {
  let component: ProposalextrainformationsummaryComponent;
  let fixture: ComponentFixture<ProposalextrainformationsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalextrainformationsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalextrainformationsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
