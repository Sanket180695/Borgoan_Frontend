import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubloantypesComponent } from './subloantypes.component';

describe('SubloantypesComponent', () => {
  let component: SubloantypesComponent;
  let fixture: ComponentFixture<SubloantypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubloantypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubloantypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
