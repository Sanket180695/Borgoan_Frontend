import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchinstallmentfrequencywiseComponent } from './branchinstallmentfrequencywise.component';

describe('BranchinstallmentfrequencywiseComponent', () => {
  let component: BranchinstallmentfrequencywiseComponent;
  let fixture: ComponentFixture<BranchinstallmentfrequencywiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchinstallmentfrequencywiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchinstallmentfrequencywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
