import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PledgeLoanComponent } from './pledge-loan.component';

describe('PledgeLoanComponent', () => {
  let component: PledgeLoanComponent;
  let fixture: ComponentFixture<PledgeLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PledgeLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PledgeLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
