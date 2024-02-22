import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Users1Component } from './users1.component';

describe('Users1Component', () => {
  let component: Users1Component;
  let fixture: ComponentFixture<Users1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Users1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Users1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
