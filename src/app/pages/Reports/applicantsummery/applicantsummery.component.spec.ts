import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsummeryComponent } from './applicantsummery.component';

describe('ApplicantsummeryComponent', () => {
  let component: ApplicantsummeryComponent;
  let fixture: ComponentFixture<ApplicantsummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantsummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantsummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
