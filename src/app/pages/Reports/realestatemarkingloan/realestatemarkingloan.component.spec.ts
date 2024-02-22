import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestatemarkingloanComponent } from './realestatemarkingloan.component';

describe('RealestatemarkingloanComponent', () => {
  let component: RealestatemarkingloanComponent;
  let fixture: ComponentFixture<RealestatemarkingloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealestatemarkingloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealestatemarkingloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
