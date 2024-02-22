import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicanttypeComponent } from './applicanttype.component';

describe('ApplicanttypeComponent', () => {
  let component: ApplicanttypeComponent;
  let fixture: ComponentFixture<ApplicanttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicanttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicanttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
