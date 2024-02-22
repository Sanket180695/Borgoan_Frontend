import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpersonalinfoComponent } from './gpersonalinfo.component';

describe('GpersonalinfoComponent', () => {
  let component: GpersonalinfoComponent;
  let fixture: ComponentFixture<GpersonalinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpersonalinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpersonalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
