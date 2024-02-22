import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesalaryinfoComponent } from './incomesalaryinfo.component';

describe('IncomesalaryinfoComponent', () => {
  let component: IncomesalaryinfoComponent;
  let fixture: ComponentFixture<IncomesalaryinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesalaryinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesalaryinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
