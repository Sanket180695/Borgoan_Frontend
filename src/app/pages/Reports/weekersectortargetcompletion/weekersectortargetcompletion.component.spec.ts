import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekersectortargetcompletionComponent } from './weekersectortargetcompletion.component';

describe('WeekersectortargetcompletionComponent', () => {
  let component: WeekersectortargetcompletionComponent;
  let fixture: ComponentFixture<WeekersectortargetcompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekersectortargetcompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekersectortargetcompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
