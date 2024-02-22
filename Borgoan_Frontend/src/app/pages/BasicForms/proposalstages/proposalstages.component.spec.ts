import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalstagesComponent } from './proposalstages.component';

describe('ProposalstagesComponent', () => {
  let component: ProposalstagesComponent;
  let fixture: ComponentFixture<ProposalstagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalstagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalstagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
