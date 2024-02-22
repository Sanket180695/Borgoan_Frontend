import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPassportInfoComponent } from './family-passport-info.component';

describe('FamilyPassportInfoComponent', () => {
  let component: FamilyPassportInfoComponent;
  let fixture: ComponentFixture<FamilyPassportInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyPassportInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPassportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
