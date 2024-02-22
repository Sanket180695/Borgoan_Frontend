import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricinfoComponent } from './agricinfo.component';

describe('AgricinfoComponent', () => {
  let component: AgricinfoComponent;
  let fixture: ComponentFixture<AgricinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgricinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgricinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
