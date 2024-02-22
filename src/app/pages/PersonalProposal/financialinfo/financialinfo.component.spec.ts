import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialinfoComponent } from './financialinfo.component';

describe('FinancialinfoComponent', () => {
  let component: FinancialinfoComponent;
  let fixture: ComponentFixture<FinancialinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
