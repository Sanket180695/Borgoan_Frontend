import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertysecurityinfoComponent } from './propertysecurityinfo.component';

describe('PropertysecurityinfoComponent', () => {
  let component: PropertysecurityinfoComponent;
  let fixture: ComponentFixture<PropertysecurityinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertysecurityinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertysecurityinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
