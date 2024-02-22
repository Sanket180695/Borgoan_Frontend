import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalguarantorComponent } from './proposalguarantor.component';

describe('ProposalguarantorComponent', () => {
  let component: ProposalguarantorComponent;
  let fixture: ComponentFixture<ProposalguarantorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalguarantorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalguarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
