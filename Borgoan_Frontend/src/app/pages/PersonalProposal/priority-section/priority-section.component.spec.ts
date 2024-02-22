import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritySectionComponent } from './priority-section.component';

describe('PrioritySectionComponent', () => {
  let component: PrioritySectionComponent;
  let fixture: ComponentFixture<PrioritySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
