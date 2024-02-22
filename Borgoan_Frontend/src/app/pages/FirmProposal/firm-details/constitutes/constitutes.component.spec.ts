import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstitutesComponent } from './constitutes.component';

describe('ConstitutesComponent', () => {
  let component: ConstitutesComponent;
  let fixture: ComponentFixture<ConstitutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstitutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
