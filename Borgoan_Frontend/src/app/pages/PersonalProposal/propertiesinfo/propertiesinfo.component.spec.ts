import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesinfoComponent } from './propertiesinfo.component';

describe('PropertiesinfoComponent', () => {
  let component: PropertiesinfoComponent;
  let fixture: ComponentFixture<PropertiesinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
