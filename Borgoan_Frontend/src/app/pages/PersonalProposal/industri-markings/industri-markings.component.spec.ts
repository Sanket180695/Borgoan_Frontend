import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustriMarkingsComponent } from './industri-markings.component';

describe('IndustriMarkingsComponent', () => {
  let component: IndustriMarkingsComponent;
  let fixture: ComponentFixture<IndustriMarkingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustriMarkingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustriMarkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
