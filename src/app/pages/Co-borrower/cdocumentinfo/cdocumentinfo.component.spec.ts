import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdocumentinfoComponent } from './cdocumentinfo.component';

describe('CdocumentinfoComponent', () => {
  let component: CdocumentinfoComponent;
  let fixture: ComponentFixture<CdocumentinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdocumentinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdocumentinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
