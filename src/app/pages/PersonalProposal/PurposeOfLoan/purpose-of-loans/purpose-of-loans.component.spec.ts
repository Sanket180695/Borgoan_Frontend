import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposeOfLoansComponent } from './purpose-of-loans.component';

describe('PurposeOfLoansComponent', () => {
  let component: PurposeOfLoansComponent;
  let fixture: ComponentFixture<PurposeOfLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurposeOfLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurposeOfLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
