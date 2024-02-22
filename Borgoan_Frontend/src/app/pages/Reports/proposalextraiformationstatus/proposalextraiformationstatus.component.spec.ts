import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalextraiformationstatusComponent } from './proposalextraiformationstatus.component';

describe('ProposalextraiformationstatusComponent', () => {
  let component: ProposalextraiformationstatusComponent;
  let fixture: ComponentFixture<ProposalextraiformationstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalextraiformationstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalextraiformationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
