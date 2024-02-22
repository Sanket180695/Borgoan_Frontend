import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationmasterComponent } from './notificationmaster.component';

describe('NotificationmasterComponent', () => {
  let component: NotificationmasterComponent;
  let fixture: ComponentFixture<NotificationmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
