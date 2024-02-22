import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumbitforscrutinyComponent } from './sumbitforscrutiny.component';

describe('SumbitforscrutinyComponent', () => {
  let component: SumbitforscrutinyComponent;
  let fixture: ComponentFixture<SumbitforscrutinyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumbitforscrutinyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumbitforscrutinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
