import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GproposalinfoComponent } from './gproposalinfo.component';

describe('GproposalinfoComponent', () => {
  let component: GproposalinfoComponent;
  let fixture: ComponentFixture<GproposalinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GproposalinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GproposalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
