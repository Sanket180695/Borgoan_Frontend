import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustriMarkingComponent } from './industri-marking.component';

describe('IndustriMarkingComponent', () => {
  let component: IndustriMarkingComponent;
  let fixture: ComponentFixture<IndustriMarkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustriMarkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustriMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
