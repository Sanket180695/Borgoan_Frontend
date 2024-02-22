import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicanttypesComponent } from './applicanttypes.component';

describe('ApplicanttypesComponent', () => {
  let component: ApplicanttypesComponent;
  let fixture: ComponentFixture<ApplicanttypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicanttypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicanttypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
