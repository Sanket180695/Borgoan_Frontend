import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubloantypeComponent } from './subloantype.component';

describe('SubloantypeComponent', () => {
  let component: SubloantypeComponent;
  let fixture: ComponentFixture<SubloantypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubloantypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubloantypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
