import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerDuarablesLoanComponent } from './consumer-durables-loan.component';

describe('ConsumerDuarablesLoanComponent', () => {
  let component: ConsumerDuarablesLoanComponent;
  let fixture: ComponentFixture<ConsumerDuarablesLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerDuarablesLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerDuarablesLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
