import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritySectionsComponent } from './priority-sections.component';

describe('PrioritySectionsComponent', () => {
  let component: PrioritySectionsComponent;
  let fixture: ComponentFixture<PrioritySectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritySectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritySectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
