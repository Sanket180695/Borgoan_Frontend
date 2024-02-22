import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantreportComponent } from './applicantreport.component';

describe('ApplicantreportComponent', () => {
  let component: ApplicantreportComponent;
  let fixture: ComponentFixture<ApplicantreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
