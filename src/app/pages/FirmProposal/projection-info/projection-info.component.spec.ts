import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionInfoComponent } from './projection-info.component';

describe('ProjectionInfoComponent', () => {
  let component: ProjectionInfoComponent;
  let fixture: ComponentFixture<ProjectionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
