import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoandisbursementComponent } from './loandisbursement.component';

describe('LoandisbursementComponent', () => {
  let component: LoandisbursementComponent;
  let fixture: ComponentFixture<LoandisbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoandisbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoandisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
