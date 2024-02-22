import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalstagehistoryreportComponent } from './proposalstagehistoryreport.component';

describe('ProposalstagehistoryreportComponent', () => {
  let component: ProposalstagehistoryreportComponent;
  let fixture: ComponentFixture<ProposalstagehistoryreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalstagehistoryreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalstagehistoryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
