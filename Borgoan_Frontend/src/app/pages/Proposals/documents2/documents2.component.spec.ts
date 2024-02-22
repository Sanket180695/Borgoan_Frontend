import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Documents2Component } from './documents2.component';

describe('Documents2Component', () => {
  let component: Documents2Component;
  let fixture: ComponentFixture<Documents2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Documents2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Documents2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
