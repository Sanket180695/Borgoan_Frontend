import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestateCommercialComponent } from './realestate-commercial.component';

describe('RealestateCommercialComponent', () => {
  let component: RealestateCommercialComponent;
  let fixture: ComponentFixture<RealestateCommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealestateCommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealestateCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
