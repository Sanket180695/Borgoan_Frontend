import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekersectionstatusComponent } from './weekersectionstatus.component';

describe('WeekersectionstatusComponent', () => {
  let component: WeekersectionstatusComponent;
  let fixture: ComponentFixture<WeekersectionstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekersectionstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekersectionstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
