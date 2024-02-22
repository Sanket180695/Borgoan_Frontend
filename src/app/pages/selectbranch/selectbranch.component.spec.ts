import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectbranchComponent } from './selectbranch.component';

describe('SelectbranchComponent', () => {
  let component: SelectbranchComponent;
  let fixture: ComponentFixture<SelectbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
