import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CproposalinfoComponent } from './cproposalinfo.component';

describe('CproposalinfoComponent', () => {
  let component: CproposalinfoComponent;
  let fixture: ComponentFixture<CproposalinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CproposalinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CproposalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
