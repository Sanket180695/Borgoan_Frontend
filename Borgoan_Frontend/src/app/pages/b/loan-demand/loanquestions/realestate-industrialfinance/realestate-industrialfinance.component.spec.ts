import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestateIndustrialfinanceComponent } from './realestate-industrialfinance.component';

describe('RealestateIndustrialfinanceComponent', () => {
  let component: RealestateIndustrialfinanceComponent;
  let fixture: ComponentFixture<RealestateIndustrialfinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealestateIndustrialfinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealestateIndustrialfinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
