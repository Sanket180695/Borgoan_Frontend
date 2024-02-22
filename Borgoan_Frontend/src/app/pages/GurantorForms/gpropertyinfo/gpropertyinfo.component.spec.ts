import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpropertyinfoComponent } from './gpropertyinfo.component';

describe('GpropertyinfoComponent', () => {
  let component: GpropertyinfoComponent;
  let fixture: ComponentFixture<GpropertyinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpropertyinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpropertyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
