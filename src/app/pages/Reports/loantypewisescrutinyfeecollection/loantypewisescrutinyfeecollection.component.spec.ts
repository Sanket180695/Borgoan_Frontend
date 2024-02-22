import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantypewisescrutinyfeecollectionComponent } from './loantypewisescrutinyfeecollection.component';

describe('LoantypewisescrutinyfeecollectionComponent', () => {
  let component: LoantypewisescrutinyfeecollectionComponent;
  let fixture: ComponentFixture<LoantypewisescrutinyfeecollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantypewisescrutinyfeecollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantypewisescrutinyfeecollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
