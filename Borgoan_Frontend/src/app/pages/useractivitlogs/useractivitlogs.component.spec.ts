import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseractivitlogsComponent } from './useractivitlogs.component';

describe('UseractivitlogsComponent', () => {
  let component: UseractivitlogsComponent;
  let fixture: ComponentFixture<UseractivitlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseractivitlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseractivitlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
