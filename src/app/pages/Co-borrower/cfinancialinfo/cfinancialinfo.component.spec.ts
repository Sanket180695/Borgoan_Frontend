import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfinancialinfoComponent } from './cfinancialinfo.component';

describe('CfinancialinfoComponent', () => {
  let component: CfinancialinfoComponent;
  let fixture: ComponentFixture<CfinancialinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfinancialinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfinancialinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
