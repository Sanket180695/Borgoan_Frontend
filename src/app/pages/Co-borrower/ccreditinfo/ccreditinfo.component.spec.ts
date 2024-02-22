import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcreditinfoComponent } from './ccreditinfo.component';

describe('CcreditinfoComponent', () => {
  let component: CcreditinfoComponent;
  let fixture: ComponentFixture<CcreditinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcreditinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcreditinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
