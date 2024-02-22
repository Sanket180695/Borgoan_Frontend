import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestateResidentialComponent } from './realestate-residential.component';

describe('RealestateResidentialComponent', () => {
  let component: RealestateResidentialComponent;
  let fixture: ComponentFixture<RealestateResidentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealestateResidentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealestateResidentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
