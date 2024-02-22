import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialFinanceMachineryComponent } from './industrial-finance-machinery.component';

describe('IndustrialFinanceMachineryComponent', () => {
  let component: IndustrialFinanceMachineryComponent;
  let fixture: ComponentFixture<IndustrialFinanceMachineryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrialFinanceMachineryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrialFinanceMachineryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
