import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantproposalComponent } from './applicantproposal.component';

describe('ApplicantproposalComponent', () => {
  let component: ApplicantproposalComponent;
  let fixture: ComponentFixture<ApplicantproposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantproposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
