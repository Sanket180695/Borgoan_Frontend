import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinbranchComponent } from './joinbranch.component';

describe('JoinbranchComponent', () => {
  let component: JoinbranchComponent;
  let fixture: ComponentFixture<JoinbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
