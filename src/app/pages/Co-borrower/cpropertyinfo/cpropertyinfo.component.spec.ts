import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpropertyinfoComponent } from './cpropertyinfo.component';

describe('CpropertyinfoComponent', () => {
  let component: CpropertyinfoComponent;
  let fixture: ComponentFixture<CpropertyinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpropertyinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpropertyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
