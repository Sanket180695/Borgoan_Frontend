import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CincomeinfoComponent } from './cincomeinfo.component';

describe('CincomeinfoComponent', () => {
  let component: CincomeinfoComponent;
  let fixture: ComponentFixture<CincomeinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CincomeinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CincomeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
