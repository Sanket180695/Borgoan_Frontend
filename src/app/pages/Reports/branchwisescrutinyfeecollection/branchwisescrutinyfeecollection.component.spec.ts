import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchwisescrutinyfeecollectionComponent } from './branchwisescrutinyfeecollection.component';

describe('BranchwisescrutinyfeecollectionComponent', () => {
  let component: BranchwisescrutinyfeecollectionComponent;
  let fixture: ComponentFixture<BranchwisescrutinyfeecollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchwisescrutinyfeecollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchwisescrutinyfeecollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
