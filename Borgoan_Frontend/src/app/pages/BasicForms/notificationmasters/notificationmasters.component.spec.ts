import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationmastersComponent } from './notificationmasters.component';

describe('NotificationmastersComponent', () => {
  let component: NotificationmastersComponent;
  let fixture: ComponentFixture<NotificationmastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationmastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationmastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
