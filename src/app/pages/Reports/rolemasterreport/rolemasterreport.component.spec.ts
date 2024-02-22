import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolemasterreportComponent } from './rolemasterreport.component';

describe('RolemasterreportComponent', () => {
  let component: RolemasterreportComponent;
  let fixture: ComponentFixture<RolemasterreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolemasterreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolemasterreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
