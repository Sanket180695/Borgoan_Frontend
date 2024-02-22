import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoborrowerinfoComponent } from './coborrowerinfo.component';

describe('CoborrowerinfoComponent', () => {
  let component: CoborrowerinfoComponent;
  let fixture: ComponentFixture<CoborrowerinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoborrowerinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoborrowerinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
