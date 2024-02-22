import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingInfoComponent } from './manufacturing-info.component';

describe('ManufacturingInfoComponent', () => {
  let component: ManufacturingInfoComponent;
  let fixture: ComponentFixture<ManufacturingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
