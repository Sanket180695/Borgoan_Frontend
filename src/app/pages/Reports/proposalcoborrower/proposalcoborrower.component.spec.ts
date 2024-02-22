import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalcoborrowerComponent } from './proposalcoborrower.component';

describe('ProposalcoborrowerComponent', () => {
  let component: ProposalcoborrowerComponent;
  let fixture: ComponentFixture<ProposalcoborrowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalcoborrowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalcoborrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
