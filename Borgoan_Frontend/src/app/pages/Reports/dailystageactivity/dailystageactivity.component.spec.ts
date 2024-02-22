import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailystageactivityComponent } from './dailystageactivity.component';

describe('DailystageactivityComponent', () => {
  let component: DailystageactivityComponent;
  let fixture: ComponentFixture<DailystageactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailystageactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailystageactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
