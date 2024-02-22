import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignbranchesComponent } from './assignbranches.component';

describe('AssignbranchesComponent', () => {
  let component: AssignbranchesComponent;
  let fixture: ComponentFixture<AssignbranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignbranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignbranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
