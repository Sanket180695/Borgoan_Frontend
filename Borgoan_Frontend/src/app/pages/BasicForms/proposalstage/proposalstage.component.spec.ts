import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalstageComponent } from './proposalstage.component';

describe('ProposalstageComponent', () => {
  let component: ProposalstageComponent;
  let fixture: ComponentFixture<ProposalstageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalstageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
