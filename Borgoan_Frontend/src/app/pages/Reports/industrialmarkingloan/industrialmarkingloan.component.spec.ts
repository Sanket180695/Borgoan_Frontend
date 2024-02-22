import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialmarkingloanComponent } from './industrialmarkingloan.component';

describe('IndustrialmarkingloanComponent', () => {
  let component: IndustrialmarkingloanComponent;
  let fixture: ComponentFixture<IndustrialmarkingloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrialmarkingloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrialmarkingloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
