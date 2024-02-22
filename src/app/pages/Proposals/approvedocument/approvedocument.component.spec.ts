import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedocumentComponent } from './approvedocument.component';

describe('ApprovedocumentComponent', () => {
  let component: ApprovedocumentComponent;
  let fixture: ComponentFixture<ApprovedocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
