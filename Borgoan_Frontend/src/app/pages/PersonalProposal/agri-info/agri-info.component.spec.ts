import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriInfoComponent } from './agri-info.component';

describe('AgriInfoComponent', () => {
  let component: AgriInfoComponent;
  let fixture: ComponentFixture<AgriInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgriInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgriInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
