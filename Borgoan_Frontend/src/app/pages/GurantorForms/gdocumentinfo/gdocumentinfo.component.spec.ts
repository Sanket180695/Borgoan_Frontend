import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdocumentinfoComponent } from './gdocumentinfo.component';

describe('GdocumentinfoComponent', () => {
  let component: GdocumentinfoComponent;
  let fixture: ComponentFixture<GdocumentinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdocumentinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdocumentinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
