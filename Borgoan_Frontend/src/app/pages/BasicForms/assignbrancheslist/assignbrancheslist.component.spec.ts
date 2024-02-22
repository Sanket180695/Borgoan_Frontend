import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignbrancheslistComponent } from './assignbrancheslist.component';

describe('AssignbrancheslistComponent', () => {
  let component: AssignbrancheslistComponent;
  let fixture: ComponentFixture<AssignbrancheslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignbrancheslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignbrancheslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
