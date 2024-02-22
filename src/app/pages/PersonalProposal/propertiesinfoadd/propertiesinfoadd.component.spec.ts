import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesinfoaddComponent } from './propertiesinfoadd.component';

describe('PropertiesinfoaddComponent', () => {
  let component: PropertiesinfoaddComponent;
  let fixture: ComponentFixture<PropertiesinfoaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesinfoaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesinfoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
