import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinyfeecollectionComponent } from './scrutinyfeecollection.component';

describe('ScrutinyfeecollectionComponent', () => {
  let component: ScrutinyfeecollectionComponent;
  let fixture: ComponentFixture<ScrutinyfeecollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrutinyfeecollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrutinyfeecollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
