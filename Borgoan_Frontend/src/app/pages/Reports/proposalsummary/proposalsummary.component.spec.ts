import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsummaryComponent } from './proposalsummary.component';

describe('ProposalsummaryComponent', () => {
  let component: ProposalsummaryComponent;
  let fixture: ComponentFixture<ProposalsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
