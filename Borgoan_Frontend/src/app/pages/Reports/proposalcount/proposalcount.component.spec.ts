import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalcountComponent } from './proposalcount.component';

describe('ProposalcountComponent', () => {
  let component: ProposalcountComponent;
  let fixture: ComponentFixture<ProposalcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
