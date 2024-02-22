import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalloginfoComponent } from './proposalloginfo.component';

describe('ProposalloginfoComponent', () => {
  let component: ProposalloginfoComponent;
  let fixture: ComponentFixture<ProposalloginfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalloginfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalloginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
