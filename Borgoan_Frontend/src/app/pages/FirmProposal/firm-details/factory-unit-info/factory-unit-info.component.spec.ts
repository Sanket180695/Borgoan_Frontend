import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryUnitInfoComponent } from './factory-unit-info.component';

describe('FactoryUnitInfoComponent', () => {
  let component: FactoryUnitInfoComponent;
  let fixture: ComponentFixture<FactoryUnitInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryUnitInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryUnitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
