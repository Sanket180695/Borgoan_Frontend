import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermForLoansComponent } from './term-for-loans.component';

describe('TermForLoansComponent', () => {
  let component: TermForLoansComponent;
  let fixture: ComponentFixture<TermForLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermForLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermForLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
