import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelplanComponent } from './travelplan.component';

describe('TravelplanComponent', () => {
  let component: TravelplanComponent;
  let fixture: ComponentFixture<TravelplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
