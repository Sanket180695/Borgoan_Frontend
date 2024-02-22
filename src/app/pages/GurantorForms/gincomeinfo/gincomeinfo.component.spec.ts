import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GincomeinfoComponent } from './gincomeinfo.component';

describe('GincomeinfoComponent', () => {
  let component: GincomeinfoComponent;
  let fixture: ComponentFixture<GincomeinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GincomeinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GincomeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
