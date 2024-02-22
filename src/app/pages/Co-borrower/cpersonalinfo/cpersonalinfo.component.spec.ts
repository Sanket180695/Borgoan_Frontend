import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpersonalinfoComponent } from './cpersonalinfo.component';

describe('CpersonalinfoComponent', () => {
  let component: CpersonalinfoComponent;
  let fixture: ComponentFixture<CpersonalinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpersonalinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpersonalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
