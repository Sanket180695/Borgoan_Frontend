import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcreditinfoComponent } from './gcreditinfo.component';

describe('GcreditinfoComponent', () => {
  let component: GcreditinfoComponent;
  let fixture: ComponentFixture<GcreditinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcreditinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcreditinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
