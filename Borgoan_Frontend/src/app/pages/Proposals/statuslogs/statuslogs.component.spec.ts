import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuslogsComponent } from './statuslogs.component';

describe('StatuslogsComponent', () => {
  let component: StatuslogsComponent;
  let fixture: ComponentFixture<StatuslogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatuslogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatuslogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
